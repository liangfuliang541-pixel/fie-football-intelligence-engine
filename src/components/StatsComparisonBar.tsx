interface StatsComparisonBarProps {
  label: string;
  homeValue: number;
  awayValue: number;
  className?: string;
}

export default function StatsComparisonBar({
  label,
  homeValue,
  awayValue,
  className,
}: StatsComparisonBarProps) {
  const total = homeValue + awayValue;
  const homePercent = total > 0 ? (homeValue / total) * 100 : 50;
  const awayPercent = total > 0 ? (awayValue / total) * 100 : 50;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-bold text-fie-accent-teal font-tabular">{homeValue}</span>
        <span className="text-xs uppercase tracking-wider text-fie-text-muted">{label}</span>
        <span className="text-sm font-bold text-fie-accent-blue font-tabular">{awayValue}</span>
      </div>
      <div className="flex h-1.5 w-full gap-0.5">
        <div className="rounded-l-full bg-fie-accent-teal" style={{ width: `${homePercent}%` }} />
        <div className="rounded-r-full bg-fie-accent-blue" style={{ width: `${awayPercent}%` }} />
      </div>
    </div>
  );
}
