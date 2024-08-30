'use client'

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Logout() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center justify-center p-8 w-full max-w-md text-center bg-box-bg border border-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-white mb-6">Você deseja sair?</h1>
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all duration-200"
          >
            <i className="bx bx-exit text-xl"></i>Sair
          </button>
          <Link href="/" className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all duration-200">
            <i className="bx bxs-user-check text-xl"></i>Continuar
          </Link>
        </div>
      </div>
    </section>
  );
}
