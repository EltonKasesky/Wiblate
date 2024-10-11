import Link from 'next/link';
import DropdownMenuUser from './DropDownMenu';

type NavHeaderProps = {
  isLoggedIn: boolean;
};

export default function NavHeader({ isLoggedIn }: NavHeaderProps) {
  return (
    <div className="hidden md:flex md:items-center md:ml-auto">
      <ul className="flex flex-row space-x-8 items-center">
        <li className="nav-header">
          <Link href="/" className="cursor-pointer">Início</Link>
        </li>
        <li className="nav-header">
          <Link href="/about" className="cursor-pointer">Sobre</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <DropdownMenuUser />
          ) : (
            <Link href="/portal/login">
              <div className="btn btn-hover uppercase font-bold py-2 px-6 cursor-pointer">
                <span className="relative z-10 text-black dark:text-white">Login</span>
              </div>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}
