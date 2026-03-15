import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
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
