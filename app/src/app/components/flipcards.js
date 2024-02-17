'use client';

import { useState, useEffect } from 'react';
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

const Entry = ( { front, back, flip, outro, onFlip, onCorrect, onWrong, className, ...props } ) => {
  const isHidden = outro || ! flip;

  return (
    <div className={ cn( 'flex w-full flex-row justify-center gap-2 md:w-2/3 md:gap-8', className ) } { ...props }>
      <div className={ cn( 'grow-0 self-center transition-all duration-500 ease-in-out', { 'opacity-0 invisible': isHidden, 'opacity-100 visible': ! isHidden } ) }>
        <button className='bg-destructive text-destructive-foreground hover:bg-destructive/70 rounded-xl p-4 transition-colors duration-500' onClick={ onWrong } >
          <Icons.wrong className='size-6' />
        </button>
      </div>
      <div className='flex grow flex-col items-stretch gap-4'>
        <div className='grow'>
          <FlipCard.Root flip={ flip } onClick={ onFlip } className='min-h-72 w-full cursor-pointer text-2xl leading-loose'>
            <FlipCard.Front className='text-card-foreground bg-secondary rounded-xl border-4 border-sky-500 p-6 '>
              <span className={ cn( 'transition-opacity duration-200', { 'opacity-0': isHidden }, { 'opacity-100': ! outro && ! flip } ) }>{ front }</span>
            </FlipCard.Front>
            <FlipCard.Back className='text-card-foreground bg-secondary rounded-xl border-4 border-orange-500 p-6'>
              <span className={ cn( 'transition-opacity duration-200', { 'opacity-0': isHidden }, { 'opacity-100': ! outro && flip } ) }>{ back }</span>
            </FlipCard.Back>
          </FlipCard.Root>
        </div>
        <div className={ cn( 'text-card-foreground bg-secondary mx-4 select-none whitespace-pre rounded-xl border-4 border-sky-500 p-2 text-xs leading-loose transition-all duration-500', { 'opacity-0 invisible': isHidden, 'opacity-100 visible': ! isHidden } ) }>
          <span className={ cn( 'transition-opacity duration-200', { 'opacity-0': isHidden }, { 'opacity-100': ! outro && ! flip } ) }>{ front }</span>
        </div>
      </div>
      <div className={ cn( 'grow-0 self-center transition-all duration-500 ease-in-out', { 'opacity-0 invisible': isHidden, 'opacity-100 visible': ! isHidden } ) }>
        <button className='bg-green text-green-foreground hover:bg-green/70 rounded-xl p-4 transition-colors duration-500' onClick={ onCorrect } >
          <Icons.check className='size-6' />
        </button>
      </div>
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
    <div className='flex w-full flex-col items-center space-y-4'>
      <HeaderInner title={ attr.title } slug={ attr.slug } reversable={ attr.reversable } />
      <Progress value={ step - 1 } max={ questions.length } />
      <div className='h-4' ></div>
      { stepActions.canGoToNextStep ? (
        <Entry
          front={ getQuestion().question }
          back={ getQuestion().answer }
          flip={ flipped }
          outro={ changing }
          onFlip={ () => toggleFlipped() }
          onCorrect={ answerCorrect }
          onWrong={ answerWrong }
        />
      ) : (
        <div className='flex w-full flex-col items-center gap-8'>
          <h2 className='text-2xl'>Your Score: <span className='text-green-500'>{ 100 * correct.size / questions.length }%</span></h2>
          <button className='bg-secondary hover:bg-secondary/70 inline-flex items-center gap-2 rounded-md border p-4 text-base font-semibold' onClick={ reset } >
            <Icons.reset className='size-4' />Reset
          </button>
          { wrong.size > 0 &&
            <div className='flex w-full flex-col space-y-4'>
              <h2 className='text-2xl'>Wrong Answers: <span className='text-red-500'>{ wrong.size }/{ questions.length }</span></h2>
              <Separator />
              { [ ...wrong.values() ].map( ( value ) => (
                <TableEntry key={ value.id } question={ value.question } answer={ value.answer } />
              ) ) }
            </div>
          }
          { correct.size > 0 &&
            <div className='flex w-full flex-col space-y-4'>
              <h2 className='text-2xl'>Correct Answers: <span className='text-green-500'>{ correct.size }/{ questions.length }</span></h2>
              <Separator />
              { [ ...correct.values() ].map( ( value ) => (
                <TableEntry key={ value.id } question={ value.question } answer={ value.answer } />
              ) ) }
            </div>
          }
        </div>
      ) }
    </div>
  );
};

export { FlipCards };
