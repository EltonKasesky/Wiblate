"use client";

import Members from '@/components/users/Users';
import ProtectedPage from '@/components/protection/ProtectedPage';

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
        <Members />
      </ProtectedPage>
    </>
  )
}