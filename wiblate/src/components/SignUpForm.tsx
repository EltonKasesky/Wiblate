import { Button, buttonVariants } from '@/components/ui/button';
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
import Image from 'next/image';

export default function SignUpForm() {
  return (
    <section className='w-full h-screen flex flex-row-reverse items-center justify-center'>
      {/* LOGIN IMAGE*/}
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
      {/* END LOGIN IMAGE*/}
      <form className='px-10 py-login-form border rounded-lg md:border-0 md:border-l md:border-y md:rounded-r-none md:rounded-l-lg w-96 bg-white' action={AuthActions.createAccount}>
        <h1 className='text-3xl font-bold mb-4 text-black'>Cadastro</h1>
        <p className='text-md text-black font-semibold mb-10'>Preencha os campos abaixo para criar uma conta.</p>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="name" className="text-black font-semibold">Nome</label>
            <input
              id="name"
              name="name"
              type='string'
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
          <GoogleLoginButton />
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