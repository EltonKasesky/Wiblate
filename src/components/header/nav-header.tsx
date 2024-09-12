import Link from 'next/link';

type NavHeaderProps = {
  userCargo: string | null;
  isLoggedIn: boolean;
};

export default function NavHeader({ userCargo, isLoggedIn }: NavHeaderProps) {
  return (
    <div className="hidden md:flex md:items-center md:ml-auto">
      <ul className="flex flex-row space-x-8 items-center">
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
          </>
        )}
        {userCargo && ["Produtor", "Gerenciador", "Administrador"].includes(userCargo) && (
          <>
            <li className="nav-header">
              <Link href="/Announce" className="cursor-pointer">Insert</Link>
            </li>
          </>
        )}
        {userCargo && ["Gerenciador", "Administrador"].includes(userCargo) && (
          <>
            <li className="nav-header">
              <Link href="/users" className="cursor-pointer">Gerenciar</Link>
            </li>
          </>
        )}
        <li>
          {isLoggedIn ? (
            <Link href="/portal/logout">
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
  );
}