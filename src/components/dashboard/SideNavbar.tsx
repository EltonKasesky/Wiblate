'use client';

import Link from "next/link";
import { signOut } from "next-auth/react";
import NavLink from './NavLink';
import { useState } from 'react';

type SideNavbarProps = {
    userCargo: string | null;
};

export default function SideNavbar({ userCargo }: SideNavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: '/' });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-100 z-40" 
                    onClick={closeMenu}
                ></div>
            )}

            <button
                className="lg:hidden p-4 fixed top-0 left-0 z-50 bg-transparent shadow-md"
                onClick={toggleMenu}
            >
                <i className="bx bx-menu text-2xl"></i>
            </button>

            <section className={`fixed lg:relative lg:w-64 lg:flex lg:flex-col h-screen w-full lg:bg-white dark:bg-box-bg-dark shadow-lg lg:shadow-none transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} z-50`}>
                <div className="flex justify-between items-center lg:py-3 lg:border-b lg:border-gray-200 p-4 lg:p-0">
                    <Link href="/" className="flex items-center justify-center w-full text-xl font-extrabold text-main-color">
                        <i className="bx bx-movie-play bx-tada text-3xl"></i>
                        <span className="ml-2">TIP</span>
                        <span>TV</span>
                    </Link>
                    <button className="lg:hidden z-50" onClick={toggleMenu}>
                        <i className="bx bx-x text-2xl"></i>
                    </button>
                </div>

                <nav className="flex flex-col flex-grow mt-6">
                    <section className="flex flex-col flex-grow justify-between w-full">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <NavLink href="/dashboard/user" iconClassName="bxs-user" text="Usuário" onClick={closeMenu} />
                            <NavLink href="/dashboard/settings" iconClassName="bxs-cog" text="Configurações" onClick={closeMenu} />
                            <NavLink href="/dashboard/contact" iconClassName="bxs-envelope" text="Contato" onClick={closeMenu} />

                            {userCargo && ["Produtor", "Gerenciador", "Administrador"].includes(userCargo) && (
                                <NavLink href="/dashboard/insert" iconClassName="bxs-folder-open" text="Insert" onClick={closeMenu} />
                            )}
                            {userCargo && ["Produtor", "Gerenciador", "Administrador"].includes(userCargo) && (
                                <NavLink href="/dashboard/announce" iconClassName="bxs-add-to-queue" text="Anúncio" onClick={closeMenu} />
                            )}
                            {userCargo && ["Gerenciador", "Administrador"].includes(userCargo) && (
                                <NavLink href="/dashboard/users" iconClassName="bxs-group" text="Gerenciar" onClick={closeMenu} />
                            )}
                        </div>

                        <div className="flex flex-col gap-3 items-center justify-center mt-auto mb-4 pt-3 lg:border-t border-gray-200">
                            <NavLink href="/" iconClassName="bxs-home" text="Início" onClick={closeMenu} />
                            <button 
                                onClick={async () => {
                                    await handleLogout();
                                    closeMenu();
                                }} 
                                className="flex items-center w-full max-w-[90%] py-2 px-3 rounded-lg bg-gray-200 transition-colors duration-300 hover:bg-gray-300"
                            >
                                <div className="flex items-center w-full text-left">
                                    <i className="bx bxs-exit text-lg text-gray-600"></i>
                                    <span className="ml-3 text-gray-700 font-medium">Logout</span>
                                </div>
                            </button>
                        </div>
                    </section>
                </nav>
            </section>
        </>
    );
}
