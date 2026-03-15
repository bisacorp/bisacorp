import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { z } from "zod";
import { headers } from "next/headers";
import dns from "node:dns/promises";
import { contactRateLimiter } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi.").max(100, "Nama terlalu panjang."),
  email: z.string().email("Format email tidak valid.").max(150, "Email terlalu panjang."),
  subject: z.string().min(1, "Subjek wajib diisi.").max(200, "Subjek terlalu panjang."),
  message: z.string().min(1, "Pesan wajib diisi.").max(5000, "Pesan terlalu panjang."),
  user_fax: z.string().optional(), // Honeypot field
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

    if (ip !== "unknown-ip" && !contactRateLimiter.check(ip)) {
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

    const { name, email, subject, message, user_fax } = parsed.data;

    // 2. Honeypot Check
    if (user_fax) {
      console.warn(`[Spam Blocked] Bot detected via honeypot from IP: ${ip}`);
      // Fake a 200 response to fool the bot into thinking it succeeded
      return NextResponse.json({ success: true });
    }

    // 3. Deep Email Validation (MX Record Lookup)
    const hasMailServer = await isValidMailDomain(email);
    if (!hasMailServer) {
        return NextResponse.json(
            { error: "Domain email tidak valid atau tidak bisa menerima email." },
            { status: 400 },
        );
    }

    const { error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, subject, message }]);

    if (error) {
      console.error("[Supabase error]", error);
      return NextResponse.json(
        { error: "Gagal menyimpan pesan. Coba lagi nanti." },
        { status: 500 },
      );
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
