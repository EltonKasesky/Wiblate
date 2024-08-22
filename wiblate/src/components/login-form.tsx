'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GoogleLoginButton from './GoogleLoginButton';

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
  
      console.log('[LOGIN_RESPONSE]: ', response);
  
      if (!response?.error) {
        router.refresh();
        router.push('/');
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (error) {
      console.log('[LOGIN_ERROR]: ', error);
    }
  };
  

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <form className='p-10 border rounded-lg w-96' onSubmit={handleLogin}>
        <h1 className='text-3xl font-bold mb-4 text-white'>Login</h1>
        <p className='text-sm text-white-700 mb-10'>Faça login para continuar.</p>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="email" className="text-white">E-mail</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full p-3 text-black"
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="password" className="text-white">Senha</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full p-3 text-black"
            />
          </div>
          {error && <span className="text-red-400 text-sm block mt-2">{error}</span>}
          <GoogleLoginButton />
          <button
            type='submit'
            className='mt-3 bg-rose-950 text-slate-50 p-3 rounded'
          >
            Entrar
          </button>
          <button
            type='button'
            onClick={() => router.push('/portal/cadastro')}
            className='mt-4 text-slate-50 p-3 rounded bg-blue-600'
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export { LoginForm };