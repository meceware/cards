'use client';

import { useRef } from 'react';
import { useEventListener } from 'usehooks-ts';

const SearchBar = ( { value, onChangeHandler } ) => {
  const inputRef = useRef();

  useEventListener( 'keydown', ( e ) => {
    if ( e.ctrlKey && e.key === 'k' ) {
      e.preventDefault();
      inputRef.current?.focus();
    }
  } );

  return (
    <div className='relative w-full'>
      <input ref={ inputRef } type='search' value={ value } onChange={ onChangeHandler } placeholder='Search...' className='border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-lg border bg-transparent p-3 pr-12 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'/>
      <div className='absolute right-1.5 top-0 flex h-full items-center'>
        <kbd className='pointer-events-none flex select-none gap-1 rounded border px-1.5 py-1 font-mono text-xs font-medium'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </div>
    </div>
  );
};

export { SearchBar };
