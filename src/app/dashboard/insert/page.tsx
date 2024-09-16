"use client";


import Insert from "@/components/insert/Insert";
import ProtectedPage from "@/components/protection/ProtectedPage";

export default function InsertPage() {
  return (
    <>
      <ProtectedPage allowedCargos={["Administrador", "Gerenciador", "Produtor"]}>
        <Insert />
      </ProtectedPage>
    </>
  );
}