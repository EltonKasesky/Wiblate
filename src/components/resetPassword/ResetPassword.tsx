'use client';

import Image from 'next/image';

const ResetPassword = () => {
  return (
    <section className='w-full h-screen flex items-center justify-center my-20 sm:my-0'>
      {/* FORGOT IMAGE*/}
      <section className='hidden md:block w-reset-password-image h-reset-password-image'>
        <Image
          className='rounded-l-lg'
          src='/images/resetPassword/resetpassword.png'
          width={384}
          height={456}
          alt='Reset Image'
          priority
        />
      </section>
      {/* END FORGOT IMAGE*/}
      {/* FORGOT FORM */}
      <form className='px-10 py-login-form border rounded-lg md:border-0 md:border-r md:border-y md:rounded-l-none md:rounded-r-lg w-96 bg-white'>
        <h1 className='text-3xl font-bold mb-4 text-black'>Redefina sua senha</h1>
        <p className='text-md text-black font-semibold mb-10'>Insira sua nova senha abaixo para continuar.</p>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="password" className="text-black font-semibold">Insira sua nova senha</label>
            <input
              type="password"
              name="password"
              placeholder='Insira sua senha'
              className="login-input"
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor="password2" className="text-black font-semibold">Insira novamente</label>
            <input
              type="password"
              name="password2"
              placeholder='Insira sua senha'
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

export { ResetPassword };