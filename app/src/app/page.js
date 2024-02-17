import { Suspense } from 'react';
import { CardSkeletons } from '@/app/components/card-skeleton';
import { CardGroupsList } from '@/app/components/card-groups-list';
import { StrapiFetch } from '@/lib/strapi-fetch';

const CardsList = async() => {
  const groups = await StrapiFetch( 'cards?populate=questions&sort=updatedAt%3Adesc' );
  return (
    <CardGroupsList groups={ groups } />
  );
};

export default function Home() {
  return (
    <section className='container flex flex-col items-center gap-4 py-8 text-center'>
      <div className='w-full md:w-2/3'>
        <Suspense fallback={ <CardSkeletons/> }>
          <CardsList />
        </Suspense>
      </div>
    </section>
  );
}
