'use client';

import { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeColor = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [buttonLabel, setButtonLabel] = useState('Mudar Tema');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('system');
    }
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      setButtonLabel('Tema: Claro');
    } else if (theme === 'dark') {
      setButtonLabel('Tema: Escuro');
    } else {
      setButtonLabel('Tema: Sistema');
    }
  }, [theme]);

  const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <section className='rounded-lg shadow-lg bg-white border border-gray-200 dark:bg-box-bg-dark dark:border-white'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center px-4 py-2 text-sm font-medium bg-main-bg-light dark:bg-main-bg-dark text-main-color-light dark:text-main-color-dark rounded-md hover:bg-hover-light dark:hover:bg-hover-dark">
            {theme === 'light' && <i className="bx bx-sun mr-2 text-yellow-500"></i>}
            {theme === 'dark' && <i className="bx bx-moon mr-2 text-pink-400"></i>}
            {theme === 'system' && <i className="bx bx-desktop mr-2 text-blue-400"></i>}
            {buttonLabel}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-box-bg-light dark:bg-box-bg-dark">
          <DropdownMenuItem onClick={() => handleThemeChange('light')}>
            <Sun className="mr-2 h-4 w-4" /> Claro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
            <Moon className="mr-2 h-4 w-4" /> Escuro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange('system')}>
            <Monitor className="mr-2 h-4 w-4" /> Sistema
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default ThemeColor;
