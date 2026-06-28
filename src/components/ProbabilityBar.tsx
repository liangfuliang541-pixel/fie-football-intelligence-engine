import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProbabilityBarProps {
  label: string;
  value: number;
  color?: 'teal' | 'warning' | 'danger' | 'blue' | 'purple' | 'success';
  showPercent?: boolean;
  className?: string;
  barHeight?: number;
}

const colorMap = {
  teal: '#00D4A0',
  warning: '#FFB020',
  danger: '#FF3B5C',
  blue: '#3B82F6',
  purple: '#8B5CF6',
  success: '#00E676',
};

export default function ProbabilityBar({
  label,
  value,
  color = 'teal',
  showPercent = true,
  className,
  barHeight = 2,
}: ProbabilityBarProps) {
  const barColor = colorMap[color];
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-fie-text-secondary">{label}</span>
          {showPercent && (
            <span className="text-sm font-mono font-semibold text-fie-text-primary font-tabular">{value}%</span>
          )}
        </div>
      )}
      <div className="w-full rounded-full bg-fie-bg-secondary" style={{ height: `${barHeight * 4}px` }}>
        <motion.div
          className="rounded-full"
          style={{ backgroundColor: barColor, height: `${barHeight * 4}px` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
        />
      </div>
    </div>
  );
}
