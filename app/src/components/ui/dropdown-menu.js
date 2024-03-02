'use client';

import { forwardRef } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';

import { cn } from '@/lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = forwardRef( ( { className, inset, children, ...props }, ref ) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ ref }
    className={ cn(
      'focus:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
      inset && 'pl-8',
      className,
    ) }
    { ...props }
  >
    { children }
    <ChevronRight className='ml-auto size-4' />
  </DropdownMenuPrimitive.SubTrigger>
) );

const DropdownMenuSubContent = forwardRef( ( { className, ...props }, ref ) => (
  <DropdownMenuPrimitive.SubContent
    ref={ ref }
    className={ cn(
      'text-on-popover bg-popover animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
      className,
    ) }
    { ...props }
  />
) );

const DropdownMenuContent = forwardRef( ( { className, sideOffset = 4, ...props }, ref ) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ ref }
      sideOffset={sideOffset}
      className={ cn(
        'bg-popover text-popover-foreground animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
        className,
      ) }
      { ...props }
    />
  </DropdownMenuPrimitive.Portal>
) );

const DropdownMenuItem = forwardRef( ( { className, inset, ...props }, ref ) => (
  <DropdownMenuPrimitive.Item
    ref={ ref }
    className={ cn(
      'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className,
    ) }
    { ...props }
  />
) );

const DropdownMenuCheckboxItem = forwardRef( ( { className, children, checked, ...props }, ref ) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ ref }
    className={ cn(
      'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    ) }
    checked={checked}
    { ...props }
  >
    <span className='absolute left-2 flex size-3.5 items-center justify-center'>
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className='size-4' />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    { children }
  </DropdownMenuPrimitive.CheckboxItem>
) );

const DropdownMenuRadioItem = forwardRef( ( { className, children, ...props }, ref ) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ ref }
    className={ cn(
      'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    ) }
    { ...props }
  >
    <span className='absolute left-2 flex size-3.5 items-center justify-center'>
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className='size-2 fill-current' />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    { children }
  </DropdownMenuPrimitive.RadioItem>
) );

const DropdownMenuLabel = forwardRef( ( { className, inset, ...props }, ref ) => (
  <DropdownMenuPrimitive.Label
    ref={ ref }
    className={ cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className,
    ) }
    { ...props }
  />
) );

const DropdownMenuSeparator = forwardRef( ( { className, ...props }, ref ) => (
  <DropdownMenuPrimitive.Separator
    ref={ ref }
    className={ cn( 'bg-muted -mx-1 my-1 h-px', className ) }
    { ...props }
  />
) );

const DropdownMenuShortcut = ( { className, ...props } ) => {
  return (
    <span
      className={ cn( 'ml-auto text-xs tracking-widest opacity-60', className ) }
      { ...props }
    />
  );
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
