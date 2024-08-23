import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import AuthActions from '@/app/actions/auth-actions';
import GoogleLoginButton from './GoogleLoginButton';
import { Checkbox } from '@/components/ui/checkbox';

export default function SignUpForm() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <form className='p-10 border rounded-lg w-96' action={AuthActions.createAccount}>
        <h1 className='text-3xl font-bold mb-4 text-white'>Cadastro</h1>
        <p className='text-sm text-white-700 mb-10'>Preencha os campos abaixo para criar uma conta.</p>
        <div className='flex flex-col'>
          {/* Campos de entrada de dados */}
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="name" className="text-white">Nome</label>
            <input
              id="name"
              name="name"
              required
              className="border rounded w-full p-3 text-black" 
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="email" className="text-white">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="border rounded w-full p-3 text-black" 
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="password" className="text-white">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="border rounded w-full p-3 text-black" 
            />
          </div>

          {/* Checkbox para termos e condições */}
          <div className='flex items-start mb-6'>
            <Checkbox id="terms" name="terms" required />
            <Label htmlFor="terms" className="ml-2 text-white">
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

          {/* Botões de ação */}
          <GoogleLoginButton />
          <button
            type='submit'
            className='mt-3 bg-rose-950 text-slate-50 p-3 rounded'
          >
            Criar Conta
          </button>
          <Link
            href="/portal/login"
            className='mt-4 text-slate-50 p-3 rounded bg-blue-600 inline-block text-center'
          >
            Já Tenho Conta
          </Link>
        </div>
      </form>
    </div>
  );
}
