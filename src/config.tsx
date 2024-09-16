import { usePathname } from 'next/navigation';

import { Bell, Briefcase, Home, Settings, Users, BookText, Swords, Shield, SquarePlus, UserPlus } from 'lucide-react';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: 'Regras',
      href: '/',
      icon: <BookText size={20} />,
      active: pathname === '/',
      position: 'top',
    },
    {
      name: 'Escudo',
      href: '/profile',
      icon: <Shield size={20} />,
      active: isNavItemActive(pathname, '/profile'),
      position: 'top',
    },
    {
      name: 'Combate',
      href: '/battle',
      icon: <Swords size={20} />,
      active: isNavItemActive(pathname, '/battle'),
      position: 'top',
    },
    {
      name: 'Personagens',
      href: '/players',
      icon: <Users size={20} />,
      active: isNavItemActive(pathname, '/players'),
      position: 'top',
    },
    {
      name: 'Criar Fichas',
      href: '/tokens',
      icon: <UserPlus size={20} />,
      active: isNavItemActive(pathname, '/tokens'),
      position: 'top',
    },
    {
      name: 'Adicionar',
      href: '/powers',
      icon: <SquarePlus size={20} />,
      active: isNavItemActive(pathname, '/powers'),
      position: 'top',
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: <Settings size={20} />,
      active: isNavItemActive(pathname, '/settings'),
      position: 'bottom',
    },
  ];
};
