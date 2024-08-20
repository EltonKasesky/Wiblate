"use client";

import Script from "next/script";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Insert from "@/components/Insert";

export default function InsertPage() {
  return (
    <>
    <Header />
    <Insert />
    <Footer />
    <Script src="/js/insert.js" strategy="afterInteractive" />
    </>
  );
}