import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import MatchCard from '@/components/MatchCard';
import { matches } from '@/data/mockData';

const leagueFilters = [
  'All',
  'Premier League',
  'La Liga',
  'Bundesliga',
  'Serie A',
  'Ligue 1',
  'World Cup',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Matches() {
  const [search, setSearch] = useState('');
  const [activeLeague, setActiveLeague] = useState('All');

  const filtered = matches.filter((m) => {
    const matchesSearch =
      !search ||
      m.homeTeam.toLowerCase().includes(search.toLowerCase()) ||
      m.awayTeam.toLowerCase().includes(search.toLowerCase()) ||
      m.league.toLowerCase().includes(search.toLowerCase());
    const matchesLeague =
      activeLeague === 'All' || m.league.includes(activeLeague) || (activeLeague === 'World Cup' && m.league.includes('World'));
    return matchesSearch && matchesLeague;
  });

  const live = filtered.filter((m) => m.status === 'live');
  const upcoming = filtered.filter((m) => m.status === 'upcoming');
  const finished = filtered.filter((m) => m.status === 'finished');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl md:text-3xl font-bold text-fie-text-primary">
          Match Center
        </h1>
        <p className="text-sm text-fie-text-muted mt-1">
          Browse all matches and predictions
        </p>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-fie-text-muted" />
        <input
          type="text"
          placeholder="Search teams, leagues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-fie-border-primary bg-fie-bg-secondary py-2.5 pl-10 pr-4 text-sm text-fie-text-primary placeholder:text-fie-text-muted focus:border-fie-border-hover focus:outline-none transition-colors"
        />
      </motion.div>

      {/* League Filters */}
      <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-1">
        {leagueFilters.map((league) => (
          <button
            key={league}
            onClick={() => setActiveLeague(league)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              activeLeague === league
                ? 'bg-fie-accent-teal text-fie-bg-primary'
                : 'bg-fie-bg-secondary text-fie-text-secondary border border-fie-border-primary hover:border-fie-border-hover'
            }`}
          >
            {league}
          </button>
        ))}
      </motion.div>

      {/* LIVE */}
      <AnimatePresence mode="wait">
        {live.length > 0 && (
          <motion.section
            key="live"
            variants={itemVariants}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-fie-accent-danger animate-pulse" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-fie-accent-danger">
                Live
              </h2>
              <span className="text-xs text-fie-text-muted">({live.length})</span>
            </div>
            <div className="space-y-2">
              {live.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Upcoming */}
      <motion.section variants={itemVariants}>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-fie-text-secondary mb-3">
          Upcoming <span className="text-fie-text-muted">({upcoming.length})</span>
        </h2>
        <div className="space-y-2">
          <AnimatePresence>
            {upcoming.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <MatchCard match={match} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Finished */}
      {finished.length > 0 && (
        <motion.section variants={itemVariants}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-fie-text-secondary mb-3">
            Finished <span className="text-fie-text-muted">({finished.length})</span>
          </h2>
          <div className="space-y-2">
            {finished.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}
