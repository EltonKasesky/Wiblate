'use client';

import Image from 'next/image';

const ForgotPassword = () => {
  return (
    <section className='w-full h-screen flex items-center justify-center my-20 sm:my-0'>
      {/* FORGOT IMAGE*/}
      <section className='hidden md:block w-forgot-password-image h-forgot-password-image'>
        <Image
          className='rounded-l-lg'
          src='/images/forgotPassword/forgotpassword.png'
          width={384}
          height={456}
          alt='Forgot Image'
          priority
        />
      </section>
      {/* END FORGOT IMAGE*/}
      {/* FORGOT FORM */}
      <form className='px-10 py-login-form border rounded-lg md:border-0 md:border-r md:border-y md:rounded-l-none md:rounded-r-lg w-96 bg-white'>
        <h1 className='text-3xl font-bold mb-4 text-black'>Esqueceu sua senha?</h1>
        <p className='text-md text-black font-semibold mb-10'>Insira seu e-mail abaixo para continuar.</p>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="email" className="text-black font-semibold">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder='Insira seu e-mail'
              className="login-input"
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="email2" className="text-black font-semibold">Insira novamente seu e-mail</label>
            <input
              type="email"
              name="email2"
              placeholder='Insira seu e-mail'
              className="login-input"
            />
          </div>
          <button
            type='submit'
            className='login-form-button'
          >
            Redefinir
          </button>
        </div>
      </form>
      {/* END FORGOT FORM */}
    </section>
  );
};

export { ForgotPassword };