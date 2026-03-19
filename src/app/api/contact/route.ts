import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { z } from "zod";
import { headers } from "next/headers";
import dns from "node:dns/promises";
import { contactRateLimiter, checkRateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi.").max(100, "Nama terlalu panjang."),
  email: z.string().email("Format email tidak valid.").max(150, "Email terlalu panjang."),
  subject: z.string().min(1, "Subjek wajib diisi.").max(200, "Subjek terlalu panjang."),
  message: z.string().min(1, "Pesan wajib diisi.").max(5000, "Pesan terlalu panjang."),
  user_fax: z.string().optional(), // Honeypot field
  turnstileToken: z.string().optional(),
});

async function isValidMailDomain(email: string): Promise<boolean> {
  try {
    const domain = email.split('@')[1];
    if (!domain) return false;
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch {
    return false; // Domain tak ditemukan atau tak punya catatan email
  }
}

export async function POST(req: Request) {
  try {
    // 1. Check IP Rate Limit
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";

    if (ip !== "unknown-ip" && !(await checkRateLimit(contactRateLimiter, ip))) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan coba lagi sebentar lagi." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Input tidak valid." },
        { status: 400 },
      );
    }

    const { name, email, subject, message, user_fax, turnstileToken } = parsed.data;

    // 2. Honeypot Check
    if (user_fax) {
      console.warn(`[Spam Blocked] Bot detected via honeypot from IP: ${ip}`);
      // Fake a 200 response to fool the bot into thinking it succeeded
      return NextResponse.json({ success: true });
    }

    // 2.5 Cloudflare Turnstile Check
    if (process.env.TURNSTILE_SECRET_KEY && process.env.NODE_ENV === "production") {
      if (!turnstileToken) {
        return NextResponse.json({ error: "Captcha invalid." }, { status: 400 });
      }

      const formData = new URLSearchParams();
      formData.append("secret", process.env.TURNSTILE_SECRET_KEY);
      formData.append("response", turnstileToken);
      formData.append("remoteip", ip);

      const cfRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: formData,
      });

      const cfData = await cfRes.json();
      if (!cfData.success) {
        return NextResponse.json({ error: "Captcha verification failed. Please try again." }, { status: 400 });
      }
    }

    // 3. Deep Email Validation (MX Record Lookup)
    const hasMailServer = await isValidMailDomain(email);
    if (!hasMailServer) {
        return NextResponse.json(
            { error: "Domain email tidak valid atau tidak bisa menerima email." },
            { status: 400 },
        );
    }

    const { error } = await supabaseAdmin
      .from("contact_messages")
      .insert([{ name, email, subject, message }]);

    if (error) {
      console.error("[Supabase error]", error);
      return NextResponse.json(
        { error: "Gagal menyimpan pesan. Coba lagi nanti." },
        { status: 500 },
      );
    }

    // 4. Send Automated Emails using Nodemailer
    try {
      const transporter = require("nodemailer").createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email for the Team
      const teamMailOptions = {
        from: `"BISA Corp Web" <${process.env.EMAIL_USER}>`,
        to: "bisacorp.bisnis@gmail.com",
        subject: `[Kontak Baru] ${subject} - dari ${name}`,
        html: `
          <h2>Pesan Baru dari Form Kontak Hubungi Kami</h2>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subjek:</strong> ${subject}</p>
          <p><strong>Pesan:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        `,
      };

      // Email for the Client (Auto-reply)
      const clientMailOptions = {
        from: `"BISA Corp" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Terima kasih telah menghubungi BISA Corp",
        html: `
          <h3>Halo, ${name}!</h3>
          <p>Terima kasih telah menghubungi kami. Kami telah menerima pesan Anda dan tim kami akan segera merespons secepatnya.</p>
          <br/>
          <p><strong>Detail Pesan Anda:</strong></p>
          <p><em>Subjek:</em> ${subject}</p>
          <p><em>Pesan:</em> ${message.replace(/\n/g, '<br/>')}</p>
          <br/>
          <p>Salam hangat,</p>
          <p><strong>Tim BISA Corp</strong></p>
        `,
      };

      // Send both emails asynchronously in parallel
      await Promise.all([
        transporter.sendMail(teamMailOptions),
        transporter.sendMail(clientMailOptions)
      ]);
      console.log("[Email Sender] Automated emails sent successfully.");
    } catch (emailError) {
      console.error("[Email Sender error]", emailError);
      // We don't return an error response here because the message was already saved to the database successfully.
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API error]", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
