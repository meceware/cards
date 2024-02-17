'use client';

import { useRef, useState, useEffect } from 'react';
import { SearchBar } from '@/app/components/search-bar';
import { Icons } from '@/components/icons';
import { useDebounceValue } from 'usehooks-ts';
import Fuse from 'fuse.js';
import Link from 'next/link';

const CardGroup = ( { item } ) => {
  return (
    <div className='text-card-foreground bg-secondary rounded-lg border p-4 shadow-sm'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col items-start space-y-2'>
          <Link href={ `/cards/${ item.attributes.slug }` } title='Flashcards'>
            <h3 className='line-clamp-1 text-lg font-semibold leading-none tracking-tight'>{ item.attributes.title }</h3>
          </Link>
          <div className='flex flex-row space-x-2'>
            <div className='bg-primary hover:bg-primary/80 text-primary-foreground line-clamp-1 rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold'>{ item.attributes.class }</div>
            <div className='bg-primary hover:bg-primary/80 text-primary-foreground line-clamp-1 rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold'>{ item.attributes.questions.length } questions</div>
          </div>
        </div>
        <div className='ml-2 space-x-2 border-l pl-2'>
          <Link href={ `/cards/${ item.attributes.slug }` } title='Flashcards' className='hover:bg-accent hover:text-accent-foreground inline-flex rounded-md p-2 transition-colors'>
            <Icons.cards className='size-4' />
          </Link>
          { item.attributes.reversable !== false && (
            <Link href={ `/cards/reverse/${ item.attributes.slug }` } title='Reverse Flashcards' className='hover:bg-accent hover:text-accent-foreground inline-flex rounded-md p-2 transition-colors [transform:rotateY(180deg)]'>
              <Icons.cards className='size-4' />
            </Link>
          ) }
          <Link href={ `/list/${ item.attributes.slug }` } title='List' className='hover:bg-accent hover:text-accent-foreground inline-flex rounded-md p-2 transition-colors'>
            <Icons.list className='size-4' />
          </Link>
        </div>
      </div>
    </div>
  );
};

const CardGroupsList = ( { groups } ) => {
  const [ search, setSearch ] = useState( '' );
  const [ filter, setFilter ] = useDebounceValue( '', 500 );
  const [ filteredData, setFilteredData ] = useState( groups?.data || {} );

  const onSearchChange = ( e ) => {
    setSearch( e.target.value );
    setFilter( e.target.value );
  };

  const fuse = useRef( new Fuse( groups?.data || {}, {
    keys: [ 'attributes.title', 'attributes.questions.question', 'attributes.questions.answer' ],
    threshold: 0.2,
    location: 0,
    distance: 100,
    includeMatches: true,
    includeScore: true,
    useExtendedSearch: true,
  } ) );

  useEffect( () => {
    if ( ! filter ) {
      setFilteredData( groups?.data || {} );
      return;
    }
    const searchData = fuse.current.search( filter );
    setFilteredData( searchData );
  }, [ filter, groups?.data ] );

  return (
    <div className='flex w-full flex-col space-y-8'>
      <SearchBar value={ search } onChangeHandler={ onSearchChange } />
      { filteredData.length > 0
        ? filteredData.map( ( item, id ) => (
          <CardGroup key={ id } item={ 'item' in item ? item.item : item } />
        ) )
        : (
          <p className='text-muted-foreground text-xl leading-normal'>
            No entries found!
          </p>
        )
      }
    </div>
  );
};

export { CardGroupsList };
