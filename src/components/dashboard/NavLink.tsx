'use client';

import Link from 'next/link';
import React from 'react';

interface NavLinkProps {
    href: string;
    iconClassName: string;
    text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, iconClassName, text }) => {
    return (
        <Link 
            href={href} 
            className="flex items-center w-full max-w-[90%] py-2 px-3 rounded-lg bg-gray-200 text-gray-600 transition-colors duration-300 hover:bg-gray-300"
        >
            <div className="flex items-center w-full text-left">
                <i className={`bx ${iconClassName} text-lg`}></i>
                <span className="ml-3 font-medium">{text}</span>
            </div>
        </Link>
    );
};

export default NavLink;
