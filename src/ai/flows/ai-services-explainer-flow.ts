
'use server';
/**
 * @fileOverview Agen AI yang menghasilkan contoh kasus penggunaan atau tagline untuk solusi AI berdasarkan input pengguna dalam Bahasa Indonesia.
 *
 * - explainAIServices - Fungsi yang menangani proses penjelasan layanan AI.
 * - AIServicesExplainerInput - Tipe input untuk fungsi explainAIServices.
 * - AIServicesExplainerOutput - Tipe output untuk fungsi explainAIServices.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIServicesExplainerInputSchema = z.object({
  businessType: z.string().min(2).max(100).describe('Jenis bisnis yang dijalankan klien.'),
  problem: z.string().max(300).optional().describe('Masalah spesifik yang dihadapi klien yang bisa diselesaikan dengan AI.'),
  desiredOutcome: z.string().max(300).optional().describe('Hasil yang diinginkan klien dengan menggunakan AI.'),
});
export type AIServicesExplainerInput = z.infer<typeof AIServicesExplainerInputSchema>;

const AIServicesExplainerOutputSchema = z.object({
  useCases: z.array(z.string()).describe('Daftar contoh kasus penggunaan AI atau tagline yang relevan dengan bisnis klien dalam Bahasa Indonesia.'),
});
export type AIServicesExplainerOutput = z.infer<typeof AIServicesExplainerOutputSchema>;

export async function explainAIServices(input: AIServicesExplainerInput): Promise<AIServicesExplainerOutput> {
  try {
    const result = await aiServicesExplainerFlow(input);
    return JSON.parse(JSON.stringify(result));
  } catch (err: any) {
    console.error("[explainAIServices] Server Action Error:", err);
    throw new Error(`Gagal memproses AI: ${err.message || "Unknown error"}`);
  }
}

const aiServicesExplainerPrompt = ai.definePrompt({
  name: 'aiServicesExplainerPrompt',
  input: {schema: AIServicesExplainerInputSchema},
  output: {schema: AIServicesExplainerOutputSchema},
  prompt: `Anda adalah konsultan solusi AI untuk BISA Corp, perusahaan yang spesialis dalam pengembangan web, aplikasi, model AI, dan desain. Tugas Anda adalah membantu calon klien memahami bagaimana layanan AI BISA Corp dapat menguntungkan bisnis mereka.

Berdasarkan informasi klien, hasilkan 3-5 kasus penggunaan AI atau tagline yang menarik dan nyata dalam Bahasa Indonesia. Fokus pada aplikasi dunia nyata dan manfaat potensialnya.

Jenis Bisnis Klien: {{{businessType}}}
{{#if problem}}
Masalah Klien: {{{problem}}}
{{/if}}
{{#if desiredOutcome}}
Hasil yang Diinginkan Klien: {{{desiredOutcome}}}
{{/if}}

Berikan respons Anda sebagai objek JSON dengan array 'useCases' yang berisi deskripsi string contoh dalam Bahasa Indonesia.`,
});

const aiServicesExplainerFlow = ai.defineFlow(
  {
    name: 'aiServicesExplainerFlow',
    inputSchema: AIServicesExplainerInputSchema,
    outputSchema: AIServicesExplainerOutputSchema,
  },
  async (input) => {
    const {output} = await aiServicesExplainerPrompt(input);
    return output!;
  }
);
