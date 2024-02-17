import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CardSkeletons } from '@/app/components/card-skeleton';
import { QuestionsList } from '@/app/components/questions-list';
import { StrapiFetch } from '@/lib/strapi-fetch';

const QuestionsListS = async( { slug } ) => {
  const questions = await StrapiFetch( `cards?populate=questions&filters[slug][$eq]=${ slug }` );

  if ( ! questions?.data?.[ 0 ]?.attributes || ! questions?.meta ) {
    notFound( '/404', 'replace' );
  }

  return (
    <QuestionsList attr={ questions?.data?.[ 0 ]?.attributes } meta={ questions?.meta } />
  );
};

export const metadata = {
  title: 'Questions List',
};

export default function PageList( { params } ) {
  return (
    <section className='container flex flex-col items-center gap-4 py-8 text-center'>
      <div className='w-full md:w-2/3'>
        <Suspense fallback={ <CardSkeletons/> }>
          <QuestionsListS slug={ params?.slug } />
        </Suspense>
      </div>
    </section>
  );
}
