'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Skeleton = ( { className, ...props } ) => {
  return (
    <div className={ cn( 'bg-muted animate-pulse rounded-md', className ) } { ...props } />
  );
};

const CardSkeleton = () => {
  return (
    <Card className='my-4'>
      <CardHeader className='gap-2'>
        <Skeleton className='h-5 w-1/5' />
        <Skeleton className='h-4 w-4/5' />
      </CardHeader>
      <CardContent className='h-10' />
      <CardFooter>
        <Skeleton className='h-8 w-[120px]' />
      </CardFooter>
    </Card>
  );
};

const CardSkeletons = () => (
  <>
    <CardSkeleton/>
    <CardSkeleton/>
    <CardSkeleton/>
  </>
);

export { CardSkeleton, CardSkeletons };
