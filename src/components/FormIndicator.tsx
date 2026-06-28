import { cn } from '@/lib/utils';

interface FormIndicatorProps {
  results: ('W' | 'D' | 'L')[];
  className?: string;
}

const resultStyles = {
  W: 'bg-fie-accent-teal',
  D: 'bg-fie-accent-warning',
  L: 'bg-fie-accent-danger',
};

export default function FormIndicator({ results, className }: FormIndicatorProps) {
  return (
    <div className={cn('flex gap-1', className)}>
      {results.map((result, i) => (
        <span
          key={i}
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white',
            resultStyles[result]
          )}
        >
          {result}
        </span>
      ))}
    </div>
  );
}
