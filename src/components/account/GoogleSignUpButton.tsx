'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';

const GoogleSignUpButton = () => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await signIn('google', { callbackUrl: '/portal/login' }); 
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignUp}
      className="w-full flex items-center font-semibold justify-center h-google-button px-6 mt-4 bg-white border border-main-color text-main-color p-3 rounded-lg hover:bg-main-color hover:text-white transition-all duration-100"
    >
      <Image src="/images/login/google.png" alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continuar com o Google</span>
    </button>
  );
};

export default GoogleSignUpButton;