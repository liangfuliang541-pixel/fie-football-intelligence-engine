import type { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'danger' | 'purple' | 'warning';
  style?: CSSProperties;
}

const variantStyles = {
  default: 'bg-[rgba(21,26,37,0.75)] border-[#1E2940]',
  accent: 'bg-[rgba(21,26,37,0.75)] border-fie-accent-teal shadow-[0_0_20px_rgba(0,212,160,0.1)]',
  danger: 'bg-[rgba(21,26,37,0.75)] border-fie-accent-danger shadow-[0_0_20px_rgba(255,59,92,0.1)]',
  purple: 'bg-[rgba(21,26,37,0.75)] border-fie-accent-purple shadow-[0_0_20px_rgba(139,92,246,0.1)]',
  warning: 'bg-[rgba(21,26,37,0.75)] border-fie-accent-warning shadow-[0_0_20px_rgba(255,176,32,0.1)]',
};

export default function GlassCard({ children, className, variant = 'default', style }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        'backdrop-blur-[12px] saturate-[120%] border rounded-2xl p-5 transition-shadow',
        variantStyles[variant],
        className
      )}
      style={style}
    >
      {children}
    </motion.div>
  );
}
