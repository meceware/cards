'use client';

import { cn } from '@/lib/utils';
import * as ProgressPrimitive from '@radix-ui/react-progress';

const Progress = ( { value, max, className, ...props } ) => {
  const val = value || 0;
  const maxVal = max || 100;
  const progress = 100 - ( 100 * val / maxVal );

  return (
    <ProgressPrimitive.Root progress-value={ `${ val }/${ maxVal }` } className={ cn( 'bg-secondary before:text-secondary before:dark:text-secondary-foreground relative h-4 w-full overflow-hidden rounded-full before:absolute before:top-0 before:z-10 before:text-xs before:mix-blend-exclusion before:content-[attr(progress-value)]', className ) } {...props}>
      <ProgressPrimitive.Indicator
        className='bg-primary size-full flex-1 transition-all'
        style={ { transform: `translateX(-${ progress }%)` } }
      />
    </ProgressPrimitive.Root>
  );
};

export { Progress };
