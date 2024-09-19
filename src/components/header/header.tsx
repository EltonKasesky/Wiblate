"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import NavHeader from '@/components/header/nav-header';
import MobileMenu from '@/components/header/MobileMenu';

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
    <header className="fixed top-0 left-0 w-full z-50 bg-black">
      <div className="container mx-auto px-10 max-w-nav-header">
        <div className="flex items-center justify-between w-full h-16">
          {/* LOGO */}
          <Link href="/" className='flex items-center h-full group'>
            <div className="flex items-center justify-center text-2xl font-bold cursor-pointer">
<<<<<<< HEAD
              <i className="bx bx-movie-play bx-tada text-main-color group-hover:text-white"></i>
              <span className="text-text-color group-hover:text-main-color">ROYAL</span>
              <span className="text-main-color group-hover:text-text-color">PLAY</span>
=======
              <i className="bx bx-movie-play bx-tada text-main-color"></i>
              <span className="text-main-color">TIP</span>
              <span className="text-text-color">TV</span>
>>>>>>> b41e69b04c688c234ab262f90616fde1773dca81
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
                <Image src="/images/header/close-menu.svg" width={30} height={30} alt="Close menu" />
              ) : (
                <Image src="/images/header/open-menu.svg" width={30} height={30} alt="Open menu" />
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