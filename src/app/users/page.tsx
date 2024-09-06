"use client";

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Members from '@/components/users/Users';
import ProtectedPage from '@/components/protection/ProtectedPage';
import Copyright from '@/components/footer/copyright';

interface User {
  id: string;
  name: string;
  email: string;
  cargo: 'Membro' | 'Produtor' | 'Gerenciador' | 'Administrador';
}

export default function UsersPage(){
  return (
    <>
      <ProtectedPage allowedCargos={["Administrador", "Gerenciador", "Produtor"]}>
        <Header />
        <Members />
        <Footer />
        <Copyright />
      </ProtectedPage>
    </>
  )
}