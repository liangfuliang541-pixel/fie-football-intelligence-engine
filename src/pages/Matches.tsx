import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { matches } from '@/data/mockData';
import MatchCard from '@/components/MatchCard';

const leagueTabs = ['All', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'World Cup'];

export default function Matches() {
  const [search, setSearch] = useState('');
  const [activeLeague, setActiveLeague] = useState('All');

  const filtered = matches.filter((m) => {
    const matchSearch =
      search === '' ||
      m.homeTeam.toLowerCase().includes(search.toLowerCase()) ||
      m.awayTeam.toLowerCase().includes(search.toLowerCase()) ||
      m.league.toLowerCase().includes(search.toLowerCase());
    const matchLeague = activeLeague === 'All' || m.league.includes(activeLeague);
    return matchSearch && matchLeague;
  });

  const liveMatches = filtered.filter((m) => m.status === 'live');
  const upcomingMatches = filtered.filter((m) => m.status === 'upcoming');
  const finishedMatches = filtered.filter((m) => m.status === 'finished');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-fie-text-primary">赛事中心</h1>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fie-text-muted" />
          <input
            type="text"
            placeholder="搜索球队或联赛..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-fie-border-primary bg-fie-bg-secondary py-2.5 pl-10 pr-4 text-sm text-fie-text-primary placeholder-fie-text-muted outline-none transition-colors focus:border-fie-accent-teal"
          />
        </div>
      </div>

      {/* League Tabs */}
      <div className="flex flex-wrap gap-2">
        {leagueTabs.map((league) => (
          <button
            key={league}
            onClick={() => setActiveLeague(league)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeLeague === league
                ? 'bg-fie-accent-teal text-fie-bg-primary'
                : 'border border-fie-border-primary bg-transparent text-fie-text-secondary hover:border-fie-border-hover hover:text-fie-text-primary'
            }`}
          >
            {league}
          </button>
        ))}
      </div>

      {/* Match Lists */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLeague + search}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {liveMatches.length > 0 && (
            <div>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-fie-accent-danger">
                <span className="h-2 w-2 rounded-full bg-fie-accent-danger animate-pulse" />
                进行中 ({liveMatches.length})
              </h2>
              <div className="space-y-2">
                {liveMatches.map((match, i) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <MatchCard match={match} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {upcomingMatches.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-fie-text-muted">
                即将开始 ({upcomingMatches.length})
              </h2>
              <div className="space-y-2">
                {upcomingMatches.map((match, i) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <MatchCard match={match} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {finishedMatches.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-fie-text-dim">
                已结束 ({finishedMatches.length})
              </h2>
              <div className="space-y-2 opacity-70">
                {finishedMatches.map((match, i) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <MatchCard match={match} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
