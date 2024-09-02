"use client";

import Script from "next/script";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Insert from "@/components/insert/Insert";
import ProtectedPage from "@/components/protection/ProtectedPage";

export default function InsertPage() {
  return (
    <>
      <ProtectedPage allowedCargos={["Administrador", "Gerenciador", "Produtor"]}>
        <Header />
        <Insert />
        <Footer />
        <Script src="/js/insert.js" strategy="afterInteractive" />
      </ProtectedPage>
    </>
  );
}