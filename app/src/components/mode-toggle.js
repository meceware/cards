'use client';

import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/icons';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className = 'px-0 focus:outline-none focus-visible:outline-none'>
          <Icons.sun className = 'mr-1 block size-6 dark:hidden' />
          <Icons.moon className = 'mr-1 hidden size-6 dark:block' />
          <span className = 'sr-only'>Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={ () => setTheme( 'light' ) }>
          <Icons.sun className = 'mr-2 size-4' />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={ () => setTheme( 'dark' ) }>
          <Icons.moon className = 'mr-2 size-4' />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={ () => setTheme( 'system' ) }>
          <Icons.laptop className = 'mr-2 size-4' />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
