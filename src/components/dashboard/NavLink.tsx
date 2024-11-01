'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
    href: string;
    iconClassName: string;
    text: string;
    onClick?: () => void; // onClick opcional
}

const NavLink: React.FC<NavLinkProps> = ({ href, iconClassName, text, onClick }) => {
    const pathname = usePathname();

    const isActive = pathname === href;

    return (
        <Link 
            href={href} 
            className={`flex items-center w-full max-w-[90%] py-2 px-3 rounded-lg transition-colors duration-300 ${
                isActive ? 'bg-main-color-light dark:bg-main-color-dark text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={onClick}
        >
            <div className="flex items-center w-full text-left">
                <i className={`bx ${iconClassName} text-lg`}></i>
                <span className="ml-3 font-medium">{text}</span>
            </div>
        </Link>
    );
};

export default NavLink;