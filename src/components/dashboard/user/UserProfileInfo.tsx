'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function UserProfileInfo() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<{ name: string; email: string; avatar: string | null } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/dashboard/user/${session?.user?.id}`);
        const data = await res.json();
        setUserData({
          name: data.name || 'Usuário',
          email: data.email || 'sememail@exemplo.com',
          avatar: data.avatar || null,
        });
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session]);

  return (
    <>
      <h1 className="text-xl font-bold">Minha Conta</h1>
      {userData ? (
        <div className="flex flex-col gap-4">
          <div>
            <strong>Nome:</strong> {userData.name}
          </div>
          <div>
            <strong>Email:</strong> {userData.email}
          </div>
          <div>
            <strong>Avatar:</strong>
            {userData.avatar ? (
              <img src={`data:image/jpeg;base64,${userData.avatar}`} alt="Avatar do usuário" className="w-24 h-24 rounded-full mt-2" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 mt-2 flex items-center justify-center">
                Avatar Padrão
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </>
  );
}
