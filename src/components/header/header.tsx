"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import NavHeader from '@/components/header/nav-header';
import MobileMenu from '@/components/header/MobileMenu';
import { X, Menu } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const [userCargo, setUserCargo] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.cargo) {
      setUserCargo(session.user.cargo);
    }
  }, [session, status]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-box-bg-light dark:bg-black">
      <div className="container mx-auto px-10 max-w-nav-header">
        <div className="flex items-center justify-between w-full h-16">
          {/* LOGO */}
          <Link href="/" className='flex items-center h-full group'>
            <div className="flex items-center justify-center text-2xl font-bold cursor-pointer">
              <i className="bx bx-movie-play bx-tada text-main-color-light"></i>
              <span className="text-main-color-light">TIP</span>
              <span className="text-main-color-light">TV</span>
            </div>
          </Link>
          <NavHeader isLoggedIn={status === 'authenticated'} />
          {/* HAMBURGER BUTTON FOR MOBILE */}
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className='text-lg text-main-color dark:text-white'/>
              ) : (
                <Menu className='text-lg text-main-color dark:text-white'/>
              )}
            </button>
          </div>
        </div>

        {/* NAV MENU MOBILE */}
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} status={status} isLoggedIn={status === 'authenticated'} />
      </div>
    </header>
  );
}