'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignUpClientForm({ onSubmit }: { onSubmit: (formData: FormData) => void }) {
  const [agreed, setAgreed] = useState(false);

  const handleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    onSubmit(formData); // Envia os dados para o servidor
  };

  return (
    <form onSubmit={handleSubmit} className='p-10 border rounded-lg w-96'>
      <h1 className='text-3xl font-bold mb-4 text-white'>Cadastro</h1>
      <p className='text-sm text-white-700 mb-10'>Preencha os campos abaixo para criar uma conta.</p>
      <div className='flex flex-col'>
        <div className='flex flex-col gap-1 mb-6'>
          <label htmlFor="name" className="text-white">Nome</label>
          <input id="name" name="name" required className="border rounded w-full p-3 text-black" />
        </div>
        <div className='flex flex-col gap-1 mb-6'>
          <label htmlFor="email" className="text-white">Email</label>
          <input id="email" name="email" type="email" required className="border rounded w-full p-3 text-black" />
        </div>
        <div className='flex flex-col gap-1 mb-6'>
          <label htmlFor="password" className="text-white">Senha</label>
          <input id="password" name="password" type="password" required className="border rounded w-full p-3 text-black" />
        </div>
        <div className='flex items-start mb-6 mt-4'>
          <input
            id="agree"
            name="agree"
            type="checkbox"
            checked={agreed}
            onChange={handleAgreeChange}
            className="mr-2 mt-1"
          />
          <label htmlFor="agree" className="text-white">
            Eu concordo com os{' '}
            <Link href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Termos de Uso
            </Link>{' '}
            e a{' '}
            <Link href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Política de Privacidade
            </Link>.
          </label>
        </div>
        <button
          type='submit'
          className={`mt-3 p-3 rounded ${agreed ? 'bg-rose-950 text-slate-50' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
          disabled={!agreed}
        >
          Criar Conta
        </button>
        <Link href="/portal/login" className='mt-4 text-slate-50 p-3 rounded bg-blue-600 inline-block text-center'>
          Já Tenho Conta
        </Link>
      </div>
    </form>
  );
}
