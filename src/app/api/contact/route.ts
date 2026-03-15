import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi.").max(100, "Nama terlalu panjang."),
  email: z.string().email("Format email tidak valid.").max(150, "Email terlalu panjang."),
  subject: z.string().min(1, "Subjek wajib diisi.").max(200, "Subjek terlalu panjang."),
  message: z.string().min(1, "Pesan wajib diisi.").max(5000, "Pesan terlalu panjang."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Input tidak valid." },
        { status: 400 },
      );
    }

    const { name, email, subject, message } = parsed.data;

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
