import LiveIndicator from './LiveIndicator';
import type { MatchData } from '@/data/mockData';

interface MatchCardProps {
  match: MatchData;
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="flex h-[72px] items-center justify-between rounded-xl border border-fie-border-primary bg-[rgba(21,26,37,0.5)] px-4 transition-all duration-200 hover:border-fie-border-hover hover:-translate-y-px cursor-pointer">
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <span className="text-xl leading-none">{match.homeFlag}</span>
        <span className="truncate text-sm font-medium text-fie-text-primary">{match.homeTeam}</span>
      </div>

      <div className="flex flex-col items-center px-4">
        {match.status === 'live' || match.status === 'finished' ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xl font-bold text-fie-text-primary font-tabular">{match.homeScore}</span>
            <span className="text-fie-text-dim">-</span>
            <span className="font-mono text-xl font-bold text-fie-text-primary font-tabular">{match.awayScore}</span>
          </div>
        ) : (
          <span className="font-mono text-sm font-semibold text-fie-text-muted">{match.time}</span>
        )}
      </div>

      <div className="flex items-center justify-end gap-2.5 flex-1 min-w-0">
        <span className="truncate text-sm font-medium text-fie-text-primary">{match.awayTeam}</span>
        <span className="text-xl leading-none">{match.awayFlag}</span>
        <div className="ml-2 flex items-center gap-1.5">
          {match.status === 'live' && (
            <>
              <LiveIndicator />
              <span className="text-xs font-semibold text-fie-accent-danger">{match.liveMinute}'</span>
            </>
          )}
          {match.status === 'finished' && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(0,230,118,0.15)]">
              <svg className="h-3 w-3 text-fie-accent-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
