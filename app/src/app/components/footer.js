'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export default function Footer( { author, github } ) {
  return (
    <footer className='container '>
      <div className='flex flex-row items-center justify-between gap-4 border-t py-5'>
        <div className='flex flex-row items-center gap-2 px-0'>
          <Link href='/' className='flex items-center space-x-1'>
            <Icons.logo className='mr-1 size-6' />
          </Link>
          <p className='text-sm leading-loose'>
            Built by{' '}
            <Link href={ author.url } className={ cn( 'font-medium underline underline-offset-4 focus:outline-none' ) } target='_blank' rel='noreferrer noopener'>
              { author.name }
            </Link>
            { '.' }
          </p>
        </div>
        <Link href={ github } className={ cn( 'focus:outline-none' ) } target='_blank' rel='noreferrer noopener'>
          <Icons.gitHub className={ cn( 'size-5' ) } />
        </Link>
      </div>
    </footer>
  );
}
