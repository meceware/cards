'use client';

import { useState, useEffect, useRef } from 'react';
import range from 'lodash.range';
import shuffle from 'lodash.shuffle';
import { useEventListener, useDebounceCallback, useToggle, useStep, useMap } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Progress } from '@/app/components/progress';
import * as FlipCard from '@/app/components/flipcard';
import { TableEntry } from '@/app/components/table-entry';
import { Separator } from '@/components/ui/separator';
import { HeaderInner } from '@/app/components/header-inner';

const useSwipe = ( { onSwipeLeft, onSwipeRight } ) => {
  const touchStart = useRef( { x: 0, y: 0 } );
  const touchEnd = useRef( { x: 0, y: 0 } );

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = ( e ) => {
    touchEnd.current = { x: 0, y: 0 };
    touchStart.current.x = e.targetTouches[ 0 ].clientX;
    touchStart.current.y = e.targetTouches[ 0 ].clientY;
  };

  const onTouchMove = ( e ) => {
    touchEnd.current.x = e.targetTouches[ 0 ].clientX;
    touchEnd.current.y = e.targetTouches[ 0 ].clientY;
  };

  const onTouchEnd = () => {
    if ( ! touchStart.current.x || ! touchEnd.current.x || ! touchStart.current.y || ! touchEnd.current.y ) {
      return;
    }

    const distanceX = touchStart.current.x - touchEnd.current.x;
    const distanceY = touchStart.current.y - touchEnd.current.y;

    // Left swipe
    if ( Math.abs( distanceX ) > distanceY ) {
      if ( onSwipeLeft && distanceX > minSwipeDistance ) {
        onSwipeLeft();
      }

      // Right swipe
      if ( onSwipeRight && distanceX < -minSwipeDistance ) {
        onSwipeRight();
      }
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

const Entry = ( { front, back, hint, flip, outro, onFlip, onCorrect, onWrong, className, ...props } ) => {
  const isHidden = outro || ! flip;

  return (
    <div className='sm:min-w-p66 flex min-w-full max-w-full flex-col gap-4'>
      <div className={ cn( 'flex w-full flex-row justify-center gap-2 md:gap-8', className ) } { ...props }>
        <div className={ cn( 'grow-0 self-center transition-all duration-500 ease-in-out', { 'opacity-0 invisible': isHidden, 'opacity-100 visible': ! isHidden } ) }>
          <button className='bg-destructive text-destructive-foreground hover:bg-destructive/70 rounded-xl px-1 py-4 transition-colors duration-500 sm:px-4' onClick={ onWrong } >
            <Icons.wrong className='size-6' />
          </button>
        </div>
        <div className='flex grow flex-col items-stretch gap-4'>
          <FlipCard.Root flip={ flip } onClick={ onFlip } { ...useSwipe( { onSwipeLeft: onWrong, onSwipeRight: onCorrect } ) } className='min-h-72 w-full cursor-pointer text-xl leading-tight sm:text-2xl md:leading-normal'>
            <FlipCard.Front className='text-card-foreground bg-secondary rounded-xl border-4 border-sky-500 p-6 '>
              <span className={ cn( 'transition-opacity duration-200', { 'opacity-0': isHidden }, { 'opacity-100': ! outro && ! flip } ) }>{ front }</span>
            </FlipCard.Front>
            <FlipCard.Back className='text-card-foreground bg-secondary rounded-xl border-4 border-orange-500 p-6'>
              <span className={ cn( 'transition-opacity duration-200', { 'opacity-0': isHidden }, { 'opacity-100': ! outro && flip } ) }>{ back }</span>
              { hint && (
                <span className={ cn( 'w-full mt-4 hidden md:inline-block text-purple-700 dark:text-purple-400 border-t p-2 text-sm text-center font-normal leading-tight whitespace-pre-wrap transition-opacity duration-200', { 'opacity-0': isHidden }, { 'opacity-100': ! outro && flip } ) }>
                  { hint }
                </span>
              ) }
            </FlipCard.Back>
          </FlipCard.Root>
        </div>
        <div className={ cn( 'grow-0 self-center transition-all duration-500 ease-in-out', { 'opacity-0 invisible': isHidden, 'opacity-100 visible': ! isHidden } ) }>
          <button className='bg-green text-green-foreground hover:bg-green/70 rounded-xl px-1 py-4 transition-colors duration-500 sm:px-4' onClick={ onCorrect } >
            <Icons.check className='size-6' />
          </button>
        </div>
      </div>
      <div className='flex justify-center px-4'>
        <div className={ cn( 'text-card-foreground bg-secondary mx-4 min-w-60 select-none whitespace-pre-wrap rounded-xl border-4 border-sky-500 p-2 text-xs leading-normal shadow-xl transition-all duration-500', { 'opacity-0 invisible': isHidden, 'opacity-100 visible': ! isHidden } ) }>
          <span className={ cn( 'transition-opacity duration-200', { 'opacity-0': isHidden }, { 'opacity-100': ! outro && ! flip } ) }>{ front }</span>
        </div>
      </div>
      { hint && (
        <div className='flex justify-center px-4 md:hidden'>
          <div className={ cn( 'text-card-foreground bg-secondary mx-4 min-w-60 select-none whitespace-pre-wrap rounded-xl border-4 border-purple-700 p-2 text-xs leading-normal shadow-xl transition-all duration-500', { 'opacity-0 invisible': isHidden, 'opacity-100 visible': ! isHidden } ) }>
            <span className={ cn( 'transition-opacity duration-200', { 'opacity-0': isHidden }, { 'opacity-100': ! outro && ! flip } ) }>{ hint }</span>
          </div>
        </div>
      ) }
    </div>
  );
};

const randomIndices = ( len ) => {
  return shuffle( range( len ) );
};

const FlipCards = ( { attr, meta } ) => {
  // The list of questions
  const questions = attr?.questions;
  // const [ shuffledIndices, setShuffledIndices ] = useState( randomIndices( questions.length ) );
  const [ shuffledIndices, setShuffledIndices ] = useState( randomIndices( questions.length ) );
  const [ correct, correctActions ] = useMap();
  const [ wrong, wrongActions ] = useMap();
  const [ step, stepActions ] = useStep( questions.length + 1 );
  const [ flipped, toggleFlipped, setFlipped ] = useToggle( false );
  const [ changing, toggleChanging, setChanging ] = useToggle( false );

  useEffect( () => {
    if ( changing ) {
      toggleFlipped();
      setTimeout( () => {
        toggleChanging();
        stepActions.goToNextStep();
      }, 250 );
    }
  }, [ changing ] );

  const getQuestion = () => {
    return questions[ shuffledIndices[ step - 1 ] ];
  };

  const answer = () => {
    toggleChanging();
  };

  const answerCorrect = () => {
    if ( ! flipped ) {
      toggleFlipped();
    } else if ( stepActions.canGoToNextStep ) {
      correct.set( getQuestion().question, getQuestion() );
      answer();
    }
  };

  const answerWrong = () => {
    if ( ! flipped ) {
      toggleFlipped();
    } else if ( stepActions.canGoToNextStep ) {
      wrong.set( getQuestion().question, getQuestion() );
      answer();
    }
  };

  const reset = () => {
    setChanging( false );
    setFlipped( false );
    stepActions.reset();
    correctActions.reset();
    wrongActions.reset();
    setShuffledIndices( randomIndices( questions.length ) );
  };

  useEventListener( 'keyup', useDebounceCallback( ( e ) => {
    if ( e.key === '2' || e.key === '5' || e.key === '8' ) {
      toggleFlipped();
    }
    if ( e.key === '1' || e.key === '4' || e.key === '7' ) {
      answerWrong();
    }
    if ( e.key === '3' || e.key === '6' || e.key === '9' ) {
      answerCorrect();
    }
  }, 200 ) );

  return (
    <div className='flex w-full flex-col items-center gap-4'>
      <HeaderInner title={ attr.title } slug={ attr.slug } reversable={ attr.reversable } />
      <Progress value={ step - 1 } max={ questions.length } />
      <div className='h-4' ></div>
      { stepActions.canGoToNextStep ? (
        <Entry
          front={ getQuestion().question }
          back={ getQuestion().answer }
          hint={ getQuestion()?.hint }
          flip={ flipped }
          outro={ changing }
          onFlip={ () => toggleFlipped() }
          onCorrect={ answerCorrect }
          onWrong={ answerWrong }
        />
      ) : (
        <div className='flex w-full flex-col items-center gap-8'>
          <h2 className='text-2xl'>Your Score: <span className='text-green-500'>{ ( 100 * correct.size / questions.length ).toFixed( 1 ) }%</span></h2>
          <button className='bg-secondary hover:bg-secondary/70 inline-flex items-center gap-2 rounded-md border p-4 text-base font-semibold' onClick={ reset } >
            <Icons.reset className='size-4' />Reset
          </button>
          { wrong.size > 0 &&
            <div className='flex w-full flex-col gap-4'>
              <h2 className='text-2xl'>Wrong Answers: <span className='text-red-500'>{ wrong.size }/{ questions.length }</span></h2>
              <Separator />
              { [ ...wrong.values() ].map( ( value ) => (
                <TableEntry key={ value.id } question={ value.question } answer={ value.answer } hint={ value.hint } />
              ) ) }
            </div>
          }
          { correct.size > 0 &&
            <div className='flex w-full flex-col gap-4'>
              <h2 className='text-2xl'>Correct Answers: <span className='text-green-500'>{ correct.size }/{ questions.length }</span></h2>
              <Separator />
              { [ ...correct.values() ].map( ( value ) => (
                <TableEntry key={ value.id } question={ value.question } answer={ value.answer } hint={ value.hint } />
              ) ) }
            </div>
          }
        </div>
      ) }
    </div>
  );
};

export { FlipCards };
