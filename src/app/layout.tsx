
import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/hooks/use-language';
import { ThemeProvider } from '@/hooks/use-theme';

export const metadata: Metadata = {
  title: 'BISA Corp Digital | Solusi AI & Perangkat Lunak Terkemuka',
  description: 'BISA Corp menawarkan layanan komprehensif dalam pengembangan web, pembuatan aplikasi, pengembangan model AI, dan berbagai solusi desain.',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', type: 'image/x-icon' },
      { url: '/icon.png?v=2', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: '/icon.png?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
