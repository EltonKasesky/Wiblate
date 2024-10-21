'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Checkbox } from '../../components/ui/Checkbox';
import { Label } from '../../components/ui/label';
import GoogleSignUpButton from './GoogleSignUpButton';
import { useState } from 'react';

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const form = event.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const response = await fetch('/api/auth/cadastro', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
          terms: true, 
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json(); 

      if (!response.ok) {
        
        setErrorMessage(data.message || 'Erro ao criar conta.');
      } else if (data.success) {
        
        window.location.href = data.redirect;
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar criar conta. Tente novamente mais tarde.');
    }
  };

  return (
    <section className='w-full h-screen flex flex-row-reverse items-center justify-center my-20 sm:my-0'>
      {/* LOGIN IMAGE */}
      <section className='hidden md:block w-login-image h-sign-up-image'>
        <Image
          className='rounded-r-lg'
          src='/images/login/sign-up-image.png'
          width={384}
          height={714}
          alt='Login Image'
          priority
        />
      </section>
      {/* END LOGIN IMAGE */}
      <form
        className='px-10 py-login-form border rounded-lg md:border-0 md:border-l md:border-y md:rounded-r-none md:rounded-l-lg w-96 bg-white'
        onSubmit={handleSignUp} 
      >
        <h1 className='text-3xl font-bold mb-4 text-black'>Cadastro</h1>
        <p className='text-md text-black font-semibold mb-10'>Preencha os campos abaixo para criar uma conta.</p>

        <div className='flex flex-col'>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="name" className="text-black font-semibold">Nome</label>
            <input
              id="name"
              name="name"
              type='text'
              placeholder='Insira seu nome'
              required
              className="login-input"
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="email" className="text-black font-semibold">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder='Insira seu e-mail'
              required
              className="login-input"
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="password" className="text-black font-semibold">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder='Insira sua senha'
              required
              className="login-input"
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-4">
              {errorMessage}
            </div>
          )}

          <div className='flex items-start mb-6'>
            <Checkbox id="terms" name="terms" required className='border-black' />
            <Label htmlFor="terms" className="ml-2 text-black">
              Eu concordo com os{' '}
              <Link href="/terms" className="underline text-blue-500">
                Termos e Condições
              </Link>{' '}
              e a{' '}
              <Link href="/privacy" className="underline text-blue-500">
                Política de Privacidade
              </Link>.
            </Label>
          </div>

          <GoogleSignUpButton/>
          <button
            type='submit'
            className='login-form-button'
          >
            Criar Conta
          </button>
          <Link
            href="/portal/login"
            className='login-form-button'
          >
            Já Tenho Conta
          </Link>
        </div>
      </form>
    </section>
  );
}
