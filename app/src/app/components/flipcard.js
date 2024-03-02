'use client';

import { cn } from '@/lib/utils';

const Root = ( { flip, className, children, ...props } ) => {
  return (
    <div className={ cn( 'grid shrink [perspective:40rem] [transform-style:preserve-3d]', className ) } style={ { '--flipped': flip ? 1 : 0 } } { ...props }>
      { children }
    </div>
  );
};

const Front = ( { className, children, ...props } ) => {
  return (
    <div className={ cn( 'z-20 flex min-h-full select-none flex-col items-center justify-center whitespace-pre-wrap shadow-xl transition-transform duration-500 [backface-visibility:hidden] [grid-area:1/-1/1/-1] [transform:rotateY(calc(180deg*var(--flipped)))]', className ) } { ...props }>
      { children }
    </div>
  );
};

const Back = ( { className, children, ...props } ) => {
  return (
    <div className={ cn( 'z-10 flex min-h-full select-none flex-col items-center justify-center whitespace-pre-wrap shadow-xl transition-transform duration-500 [backface-visibility:hidden] [grid-area:1/-1/1/-1] [transform:rotateY(calc(180deg*var(--flipped)-180deg))]', className ) } { ...props }>
      { children }
    </div>
  );
};

export { Root, Front, Back };
