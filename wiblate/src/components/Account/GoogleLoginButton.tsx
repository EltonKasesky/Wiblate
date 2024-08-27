'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';

interface GoogleLoginButtonProps {
  clearError: () => void; 
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ clearError }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    clearError();  
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Error logging in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full flex items-center font-semibold justify-center h-google-button px-6 mt-4 bg-white border border-main-color text-main-color p-3 rounded-lg hover:bg-main-color hover:text-white transition-all duration-100"
      disabled={loading}
    >
      <Image src="/images/login/google.png" alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continuar com o Google</span>
    </button>
  );
};

export default GoogleLoginButton;
