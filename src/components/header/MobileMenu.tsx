import Link from 'next/link';
import DropdownMenuUser from './DropDownMenu';

type MobileMenuProps = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  status: string;
  isLoggedIn: boolean;
};

export default function MobileMenu({ menuOpen, setMenuOpen, isLoggedIn, status }: MobileMenuProps) {
  return (
    <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
      <ul className="flex flex-col space-y-4 items-end">
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
              <div className="btn btn-hover uppercase font-bold py-2 px-6 cursor-pointer mb-4">
                <span className="relative z-10 text-black dark:text-white">Login</span>
              </div>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}
