import { Separator } from '@/components/ui/separator';

const TableEntry = ( { question, answer } ) => {
  return (
    <div className='grid w-full'>
      <div className='text-card-foreground bg-secondary flex flex-row items-center justify-between gap-4 rounded-lg border p-4 shadow-sm'>
        <h3 className='w-1/2 whitespace-pre-wrap text-right text-lg font-semibold text-green-500'>{ question }</h3>
        <Separator orientation='vertical'/>
        <h3 className='w-1/2 whitespace-pre-wrap text-left text-lg font-semibold text-orange-500'>{ answer }</h3>
      </div>
    </div>
  );
};

export { TableEntry };
