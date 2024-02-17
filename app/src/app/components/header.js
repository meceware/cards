'use client';

import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

export default function Header( { github } ) {
  return (
    <header className='bg-background container'>
      <div className='flex items-center justify-between border-b py-6'>
        <div className='mr-4 flex'>
          <Link href='/' className='flex items-center space-x-1'>
            <Icons.logo className='size-6 mr-1' />
            <span className={ cn( 'inline-block font-bold' ) }>Cards</span>
          </Link>
        </div>
        <nav className='flex flex-row items-center space-x-2 md:space-x-4'>
          <Link href={ github } className={ cn( 'flex focus:outline-none' ) } target='_blank' rel='noreferrer noopener'>
            <Icons.gitHub className={ cn( 'size-5 mr-1 inline-block' ) } />
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
