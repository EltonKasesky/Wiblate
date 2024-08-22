'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';

const GoogleLoginButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Redireciona o usuário para o Google para autenticação
      await signIn('google', { callbackUrl: '/' }); // Ajuste a URL de retorno conforme necessário
    } catch (error) {
      console.error('Error logging in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-lg  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src="/images/login/google.png" alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continuar com o Google</span>
    </button>
  );
};

export default GoogleLoginButton;
