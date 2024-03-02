import Link from 'next/link';
import { Icons } from '@/components/icons';

const HeaderInner = ( { title, slug, reversable = false } ) => {
  return (
    <>
      <h1 className='line-clamp-2 text-4xl font-semibold'>{ title }</h1>
      <div className='block space-x-4'>
        <Link href={ '/' } title='Home' className='hover:bg-accent hover:text-accent-foreground inline-flex rounded-md p-2 transition-colors'>
          <Icons.home className='size-5' />
        </Link>
        <Link href={ `/cards/${ slug }` } title='Flashcards' className='hover:bg-accent hover:text-accent-foreground inline-flex rounded-md p-2 transition-colors'>
          <Icons.cards className='size-5' />
        </Link>
        { reversable !== false && (
          <Link href={ `/cards/reverse/${ slug }` } title='Reverse Flashcards' className='hover:bg-accent hover:text-accent-foreground inline-flex rounded-md p-2 transition-colors [transform:rotateY(180deg)]'>
            <Icons.cards className='size-5' />
          </Link>
        ) }
        <Link href={ `/list/${ slug }` } title='List' className='hover:bg-accent hover:text-accent-foreground inline-flex rounded-md p-2 transition-colors'>
          <Icons.list className='size-5' />
        </Link>
      </div>
    </>
  );
};

export { HeaderInner };
