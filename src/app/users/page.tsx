"use client";

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Members from '@/components/users/Users';
import ProtectedPage from '@/components/protection/ProtectedPage';

export default function UsersPage(){
  return (
    <>
      <ProtectedPage allowedCargos={["Administrador", "Gerenciador", "Produtor"]}>
        <Header />
        <Members />
        <Footer />
      </ProtectedPage>
    </>
  )
}