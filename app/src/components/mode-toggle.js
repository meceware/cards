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
          <Icons.sun className = 'size-6 mr-1 block dark:hidden' />
          <Icons.moon className = 'size-6 mr-1 hidden dark:block' />
          <span className = 'sr-only'>Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={ () => setTheme( 'light' ) }>
          <Icons.sun className = 'size-4 mr-2' />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={ () => setTheme( 'dark' ) }>
          <Icons.moon className = 'size-4 mr-2' />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={ () => setTheme( 'system' ) }>
          <Icons.laptop className = 'size-4 mr-2' />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
