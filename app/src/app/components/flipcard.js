'use client';

import { cn } from '@/lib/utils';

const Root = ( { flip, className, children, ...props } ) => {
  return (
    <div className={ cn( 'grid [perspective:40rem]', className ) } { ...props }>
      <div className={ cn(
        'flex shadow-lg transition-transform duration-500 [transform-style:preserve-3d]',
        { '[transform:rotateY(180deg)]': flip },
      ) }>
        { children }
      </div>
    </div>
  );
};

const Front = ( { className, children, ...props } ) => {
  return (
    <div className={ cn( 'flex min-h-full min-w-full select-none flex-col items-center justify-center whitespace-pre [backface-visibility:hidden]', className ) } { ...props }>
      { children }
    </div>
  );
};

const Back = ( { className, children, ...props } ) => {
  return (
    <div className={ cn( 'flex min-h-full min-w-full select-none flex-col items-center justify-center whitespace-pre [backface-visibility:hidden] [transform:rotateY(180deg)_translate(100%,0)]', className ) } { ...props }>
      { children }
    </div>
  );
};

export { Root, Front, Back };
