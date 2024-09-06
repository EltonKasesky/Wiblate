"use client";

import Script from "next/script";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Insert from "@/components/insert/Insert";
import ProtectedPage from "@/components/protection/ProtectedPage";
import Copyright from "@/components/footer/copyright";

export default function InsertPage() {
  return (
    <>
      <ProtectedPage allowedCargos={["Administrador", "Gerenciador", "Produtor"]}>
        <Header />
        <Insert />
        <Footer />
        <Copyright />
        <Script src="/js/insert.js" strategy="afterInteractive" />
      </ProtectedPage>
    </>
  );
}