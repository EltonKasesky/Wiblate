'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GoogleLoginButton from './GoogleLoginButton';
import Image from 'next/image';

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

  const clearError = () => setError('');

  return (
    <section className='w-full h-screen flex items-center justify-center'>
      {/* LOGIN IMAGE */}
      <section className='hidden md:block w-login-image h-login-image'>
        <Image
          className='rounded-l-lg'
          src='/images/login/login-image.png'
          width={384}
          height={594}
          alt='Login Image'
          priority
        />
      </section>
      {/* END LOGIN IMAGE */}
      {/* LOGIN FORM */}
      <form className='px-10 py-login-form border rounded-lg md:border-0 md:border-r md:border-y md:rounded-l-none md:rounded-r-lg w-96 bg-white' onSubmit={handleLogin}>
        <h1 className='text-3xl font-bold mb-4 text-black'>Login</h1>
        <p className='text-md text-black font-semibold mb-10'>Faça login para continuar.</p>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="email" className="text-black font-semibold">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder='Insira seu e-mail'
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="password" className="text-black font-semibold">Senha</label>
            <input
              type="password"
              name="password"
              placeholder='Insira sua senha'
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>
          {error && <span className="text-red-400 text-sm block mt-2">{error}</span>}
          <GoogleLoginButton clearError={clearError} />
          <button
            type='submit'
            className='login-form-button'
          >
            Entrar
          </button>
          <button
            type='button'
            onClick={() => router.push('/portal/cadastro')}
            className='login-form-button'
          >
            Cadastrar
          </button>
        </div>
      </form>
      {/* END LOGIN FORM */}
    </section>
  );
};

export { LoginForm };
