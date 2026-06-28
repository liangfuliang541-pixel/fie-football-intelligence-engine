import { cn } from '@/lib/utils';

interface MotivationBadgeProps {
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  className?: string;
}

const gradeStyles = {
  A: { bg: 'rgba(0,230,118,0.15)', color: '#00E676', border: 'rgba(0,230,118,0.3)' },
  B: { bg: 'rgba(0,212,160,0.15)', color: '#00D4A0', border: 'rgba(0,212,160,0.3)' },
  C: { bg: 'rgba(255,176,32,0.15)', color: '#FFB020', border: 'rgba(255,176,32,0.3)' },
  D: { bg: 'rgba(255,59,92,0.15)', color: '#FF3B5C', border: 'rgba(255,59,92,0.3)' },
  E: { bg: 'rgba(139,92,246,0.15)', color: '#8B5CF6', border: 'rgba(139,92,246,0.3)' },
};

export default function MotivationBadge({ grade, className }: MotivationBadgeProps) {
  const style = gradeStyles[grade];
  return (
    <span
      className={cn('rounded-md px-2.5 py-0.5 text-xs font-semibold border', className)}
      style={{ backgroundColor: style.bg, color: style.color, borderColor: style.border }}
    >
      Class {grade}
    </span>
  );
}
