"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import NavHeader from '@/components/header/nav-header';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hover, setHover] = useState(false);
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
          <Link href="/">
            <div
              className="flex items-center text-2xl font-bold cursor-pointer"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <i className="bx bx-movie-play bx-tada text-main-color"></i>
              <span className={hover ? 'text-main-color' : 'text-text-color'}>WIBL</span>
              <span className={hover ? 'text-text-color' : 'text-main-color'}>ATE</span>
            </div>
          </Link>
          <NavHeader userCargo={userCargo} isLoggedIn={status === 'authenticated'} />

          {/* HAMBURGER BUTTON FOR MOBILE */}
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <Image src="/header/close-menu.svg" width={30} height={30} alt="Close menu" />
              ) : (
                <Image src="/header/open-menu.svg" width={30} height={30} alt="Open menu" />
              )}
            </button>
          </div>
        </div>

        {/* NAV MENU MOBILE */}
        <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col space-y-4 items-center">
            <li className="nav-header">
              <Link href="/" className="cursor-pointer">Início</Link>
            </li>
            <li className="nav-header">
              <Link href="/about" className="cursor-pointer">Sobre</Link>
            </li>
            {userCargo && ["Produtor", "Gerenciador", "Administrador"].includes(userCargo) && (
              <>
                <li className="nav-header">
                  <Link href="/insert" className="cursor-pointer">Insert</Link>
                </li>
                <li className="nav-header">
                  <Link href="/users" className="cursor-pointer">Gerenciar</Link>
                </li>
              </>
            )}
            <li className='pb-4'>
              {status === 'authenticated' ? (
                <Link href="/api/auth/signout">
                  <div className="btn btn-hover uppercase font-bold py-2 px-6 cursor-pointer">
                    <span className="relative z-10">Logout</span>
                  </div>
                </Link>
              ) : (
                <Link href="/portal/login">
                  <div className="btn btn-hover uppercase font-bold py-2 px-6 cursor-pointer">
                    <span className="relative z-10">Login</span>
                  </div>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
