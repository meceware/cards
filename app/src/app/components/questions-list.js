'use client';

import { useRef, useState, useEffect } from 'react';
import { SearchBar } from '@/app/components/search-bar';
import { useDebounceValue } from 'usehooks-ts';
import Fuse from 'fuse.js';
import { TableEntry } from '@/app/components/table-entry';
import { HeaderInner } from '@/app/components/header-inner';

const QuestionsList = ( { attr, meta } ) => {
  const questions = attr?.questions || {};
  const [ search, setSearch ] = useState( '' );
  const [ filter, setFilter ] = useDebounceValue( '', 500 );
  const [ filteredData, setFilteredData ] = useState( questions );

  const onSearchChange = ( e ) => {
    setSearch( e.target.value );
    setFilter( e.target.value );
  };

  const fuse = useRef( new Fuse( questions, {
    keys: [ 'question', 'answer' ],
    threshold: 0.2,
    location: 0,
    distance: 100,
    includeMatches: true,
    includeScore: true,
    useExtendedSearch: true,
  } ) );

  useEffect( () => {
    if ( ! filter ) {
      setFilteredData( questions );
      return;
    }
    const searchData = fuse.current.search( filter );
    setFilteredData( searchData );
  }, [ filter, questions ] );

  return (
    <div className='flex w-full flex-col gap-4'>
      <HeaderInner title={ attr.title } slug={ attr.slug } reversable={ attr.reversable } />
      <SearchBar value={ search } onChangeHandler={ onSearchChange } />
      { filteredData.length > 0 ? (
        <>
          { filteredData.map( ( item, id ) => (
            <TableEntry key={ id } question={ 'item' in item ? item.item.question : item.question } answer={ 'item' in item ? item.item.answer : item.answer } hint={ 'item' in item ? item.item.hint : item.hint } />
          ) ) }
        </>
      ) : (
        <p className='text-muted-foreground text-xl leading-normal'>
          No entries found!
        </p>
      ) }
    </div>
  );
};

export { QuestionsList };
