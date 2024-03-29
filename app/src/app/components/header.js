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
          <Link href='/' className='flex items-center gap-1'>
            <Icons.logo className='mr-1 size-6' />
            <span className={ cn( 'inline-block font-bold' ) }>Cards</span>
          </Link>
        </div>
        <nav className='flex flex-row items-center gap-2 md:gap-4'>
          <Link href={ github } className={ cn( 'flex focus:outline-none' ) } target='_blank' rel='noreferrer noopener'>
            <Icons.gitHub className={ cn( 'mr-1 inline-block size-5' ) } />
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
