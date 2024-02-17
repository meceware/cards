import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const Card = forwardRef( ( { className, ...props }, ref ) => (
  <div
    ref={ ref }
    className={ cn(
      'bg-card text-card-foreground rounded-lg border shadow-sm',
      className,
    ) }
    { ...props }
  />
) );

const CardHeader = forwardRef( ( { className, ...props }, ref ) => (
  <div
    ref={ ref }
    className={ cn( 'flex flex-col space-y-1.5 p-6', className ) }
    { ...props }
  />
) );

const CardTitle = forwardRef( ( { className, ...props }, ref ) => (
  <h3
    ref={ ref }
    className={ cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    ) }
    { ...props }
  />
) );

const CardDescription = forwardRef( ( { className, ...props }, ref ) => (
  <p
    ref={ ref }
    className={ cn( 'text-muted-foreground text-sm', className ) }
    { ...props }
  />
) );

const CardContent = forwardRef( ( { className, ...props }, ref ) => (
  <div
    ref={ ref }
    className={ cn( 'p-6 pt-0', className ) }
    { ...props }
  />
) );

const CardFooter = forwardRef( ( { className, ...props }, ref ) => (
  <div
    ref={ ref }
    className={ cn( ' flex items-center p-6 pt-0', className ) }
    { ...props }
  />
) );

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
