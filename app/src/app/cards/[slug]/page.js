import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CardSkeletons } from '@/app/components/card-skeleton';
import { FlipCards } from '@/app/components/flipcards';
import { StrapiFetch } from '@/lib/strapi-fetch';

const PartCards = async( { slug } ) => {
  const questions = await StrapiFetch( `cards?populate=questions&filters[slug][$eq]=${ slug }` );

  if ( ! questions?.data?.[ 0 ]?.attributes || ! questions?.meta ) {
    notFound( '/404', 'replace' );
  }

  return (
    <FlipCards attr={ questions?.data?.[ 0 ]?.attributes } meta={ questions?.meta } />
  );
};

export const metadata = {
  title: 'Flashcards',
};

export default function PageCards( { params } ) {
  return (
    <section className='container flex flex-col items-center gap-4 py-8 text-center'>
      <div className='w-full md:w-2/3'>
        <Suspense fallback={ <CardSkeletons/> }>
          <PartCards slug={ params?.slug } />
        </Suspense>
      </div>
    </section>
  );
}
