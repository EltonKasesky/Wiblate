import type { Metadata } from "next";
import "@/app/globals.css";
import "../../public/styles/main.css";
import { cairo } from '@/app/fonts';
import '../../public/styles/jquerygrid.css';
import { AuthProvider } from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: "RoyalTV",
  description: "O RoyalTV é uma plataforma de streaming que oferece filmes, séries e eventos ao vivo. Além de entretenimento, trazemos informações sobre eventos, gastronomia, turismo e notícias, tudo focado em Petrópolis. Descubra o melhor da cidade com a gente!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet"/>
        <link rel="icon" href="/favicon/favicon.ico"/>
      </head>
      <body className={`${cairo.className} antialiased p-0 m-0 box-border text-main-size text-text-color`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}