'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function UserProfileInfo() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<{ name: string; email: string; avatar: string | null; createdAt: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/dashboard/user/${session?.user?.id}`);
        const data = await res.json();

        console.log(`Nome do usuario: ${data.name}`);
        console.log(`E-mail do usuario: ${data.email}`);
        console.log(`Membro desde: ${data.createdAt}`);

        setUserData({
          name: data.name || 'Usuário',
          email: data.email || 'sememail@exemplo.com',
          avatar: data.avatar || null,
          createdAt: data.createdAt || '23/09;2024'
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
    <section className="p-6 bg-white dark:bg-box-bg-dark shadow-lg rounded-lg h-full w-full flex flex-col justify-between">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Minha Conta</h1>

      {userData ? (
        <div className="flex justify-between items-center w-full">
          <section className="flex flex-col gap-2">
            <div className="text-lg font-medium text-gray-900 dark:text-gray-200">
              <strong className="block text-sm text-gray-700 dark:text-white">Nome:</strong>
              {userData.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-200">
              <strong className="block text-sm text-gray-700 dark:text-white">Email:</strong>
              {userData.email}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-200">
              <strong className="block text-sm text-gray-700 dark:text-white">Membro desde:</strong>
              {userData.createdAt}
            </div>
          </section>

          <div className="flex-shrink-0 hidden md:block dashboard-user:block">
            {userData.avatar ? (
              <img
                src={`data:image/jpeg;base64,${userData.avatar}`}
                alt="Avatar do usuário"
                className="w-24 h-24 rounded-full shadow-md"
              />
            ) : (
              <img
                src="https://github.com/shadcn.png"
                alt="Avatar padrão"
                className="w-24 h-24 rounded-full shadow-md"
              />
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Carregando dados do usuário...</p>
      )}
    </section>
  );
}
