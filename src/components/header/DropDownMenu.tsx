import { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function DropdownMenuUser() {
  const { data: session } = useSession();
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    console.log(session);
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const res = await fetch(`/api/user/${session.user.id}`);
          const data = await res.json();
          setUserName(data.name || 'Usuário');
          setUserAvatar(data.avatar || null);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  const handleLogout = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="overflow-hidden rounded-full border-2 border-color-light dark:border-black hover:border-main-color dark:hover:border-main-color">
          <Avatar>
            {userAvatar ? (
              <AvatarImage src={`data:image/png;base64,${userAvatar}`} alt={userName || 'Usuário'} />
            ) : (
              <AvatarImage src="https://github.com/shadcn.png" alt={userName || 'Usuário'} />
            )}
            <AvatarFallback>{userName ? userName[0] : 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{userName ? userName : 'Minha Conta'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard/user" className='flex items-center justify-start cursor-pointer'><i className='bx bxs-user-account text-lg mr-1'></i>Usuário</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/settings" className='flex items-center justify-start cursor-pointer'><i className='bx bxs-cog text-lg mr-1'></i>Configurações</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/contact" className='flex items-center justify-start cursor-pointer'><i className='bx bx-chat text-lg mr-1'></i>Contato</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className='flex items-center justify-start cursor-pointer'><i className='bx bx-exit text-lg mr-1'></i>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
