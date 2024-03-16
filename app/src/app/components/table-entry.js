import { Separator } from '@/components/ui/separator';

const TableEntry = ( { question, answer, hint } ) => {
  return (
    <div>
      <div className='text-card-foreground bg-secondary grid w-full rounded-lg border p-4 shadow-sm'>
        <div className='flex flex-row items-center justify-between gap-4'>
          <h3 className='w-1/2 whitespace-pre-wrap text-right text-lg font-semibold text-green-500'>{ question }</h3>
          <Separator orientation='vertical'/>
          <h3 className='w-1/2 whitespace-pre-wrap text-left text-lg font-semibold text-orange-500'>{ answer }</h3>
        </div>
        { hint &&(
          <div className='mt-4 border-t p-2 text-sm'>
            <span className='whitespace-pre-wrap text-center text-sm font-normal leading-tight text-purple-700 dark:text-purple-400'>{ hint }</span>
          </div>
        ) }
      </div>
    </div>
  );
};

export { TableEntry };
