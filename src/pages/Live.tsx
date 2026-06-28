import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Radio,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import LiveIndicator from '@/components/LiveIndicator';
import StatsComparisonBar from '@/components/StatsComparisonBar';
import MotivationBadge from '@/components/MotivationBadge';
import { liveStats, timelineEvents } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const scoreGrid = [
  [
    { home: 0, away: 0, alive: false },
    { home: 0, away: 1, alive: false },
    { home: 0, away: 2, alive: false },
    { home: 0, away: 3, alive: true },
    { home: 0, away: 4, alive: true },
  ],
  [
    { home: 1, away: 0, alive: false },
    { home: 1, away: 1, alive: false },
    { home: 1, away: 2, alive: true },
    { home: 1, away: 3, alive: true },
    { home: 1, away: 4, alive: true },
  ],
  [
    { home: 2, away: 0, alive: false },
    { home: 2, away: 1, alive: true, current: true },
    { home: 2, away: 2, alive: true },
    { home: 2, away: 3, alive: true },
    { home: 2, away: 4, alive: true },
  ],
  [
    { home: 3, away: 0, alive: true },
    { home: 3, away: 1, alive: true },
    { home: 3, away: 2, alive: true },
    { home: 3, away: 3, alive: true },
    { home: 3, away: 4, alive: true },
  ],
];

const branches = [
  {
    name: 'MAIN SCRIPT',
    prob: 78,
    color: '#00D4A0',
    bg: 'rgba(0,212,160,0.1)',
    steps: [
      { text: "67' — 2-1 (City lead)", done: true },
      { text: "75' — City controls, maintain possession", done: false },
      { text: "80' — Liverpool push for equalizer, gaps open", done: false },
      { text: 'FT — 2-1 or 3-1 City win', done: false },
    ],
  },
  {
    name: 'UPSET SCRIPT',
    prob: 12,
    color: '#FFB020',
    bg: 'rgba(255,176,32,0.1)',
    steps: [
      { text: "67' — 2-1", done: true },
      { text: "72' — Liverpool counter-attack pressure", done: false },
      { text: "78' — Equalizer through set piece", done: false },
      { text: 'FT — 2-2 or 2-3 Liverpool win', done: false },
    ],
  },
  {
    name: 'DEAD SCRIPT',
    prob: 10,
    color: '#FF3B5C',
    bg: 'rgba(255,59,92,0.1)',
    steps: [
      { text: "67' — 2-1", done: true },
      { text: "No more goals — defensive lockdown", done: false },
      { text: "FT — 2-1 (already achieved)", done: false },
    ],
    note: "This script's sub-predictions have been invalidated",
  },
];

function getEventIcon(type: string) {
  switch (type) {
    case 'goal':
      return <span className="flex h-6 w-6 items-center justify-center rounded-full bg-fie-accent-teal text-white text-xs">⚽</span>;
    case 'yellow':
      return <span className="flex h-5 w-5 items-center justify-center bg-fie-accent-warning rotate-45" />;
    case 'red':
      return <span className="flex h-5 w-5 items-center justify-center bg-fie-accent-danger rotate-45" />;
    case 'substitution':
      return <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fie-accent-blue text-white text-xs">🔄</span>;
    case 'halftime':
      return <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fie-text-muted text-white text-xs">⏸</span>;
    default:
      return null;
  }
}

export default function Live() {
  const [elapsed, setElapsed] = useState(67 * 60 + 23);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  const statsEntries = [
    { label: 'Possession', ...liveStats.possession },
    { label: 'Shots', ...liveStats.shots },
    { label: 'Shots on Target', ...liveStats.shotsOnTarget },
    { label: 'Corners', ...liveStats.corners },
    { label: 'Fouls', ...liveStats.fouls },
    { label: 'Cards', ...liveStats.cards },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ===== Scoreboard ===== */}
      <motion.section variants={itemVariants}>
        <GlassCard className="!p-0 overflow-hidden">
          <div className="p-5 md:p-6">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-fie-accent-danger" />
                <span className="text-xs font-bold uppercase tracking-wider text-fie-accent-danger">
                  Live Monitoring
                </span>
              </div>
              <span className="text-xs bg-[rgba(59,130,246,0.1)] text-fie-accent-blue rounded-full px-2.5 py-1">
                Premier League • Round 31
              </span>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-fie-accent-success" />
                <span className="text-xs text-fie-text-muted">Auto-refresh: ON</span>
              </div>
            </div>

            {/* Score */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 py-4">
              <div className="text-center md:text-right">
                <span className="text-5xl md:text-6xl">\uD83C\uDDEC\uD83C\uDDE7</span>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-fie-text-primary">
                  Man City
                </h2>
                <span className="text-xs text-fie-text-muted">(H)</span>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-5xl md:text-7xl font-extrabold text-fie-text-primary font-tabular">
                    2
                  </span>
                  <span className="text-fie-text-dim text-3xl">-</span>
                  <span className="font-mono text-5xl md:text-7xl font-extrabold text-fie-text-primary font-tabular">
                    1
                  </span>
                </div>
                <p className="text-xs text-fie-text-muted mt-2">HT: 1-0</p>
              </div>

              <div className="text-center md:text-left">
                <span className="text-5xl md:text-6xl">\uD83C\uDDEC\uD83C\uDDE7</span>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-fie-text-primary">
                  Liverpool
                </h2>
                <span className="text-xs text-fie-text-muted">(A)</span>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-3 mt-2">
              <LiveIndicator />
              <span className="font-mono text-xl md:text-2xl font-bold text-fie-accent-danger font-tabular">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-fie-text-muted">2nd Half</span>
            </div>

            {/* Motivation Tags */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-fie-text-muted">Motivation:</span>
                <MotivationBadge grade="A" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-fie-text-muted">Motivation:</span>
                <MotivationBadge grade="B" />
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.section>

      {/* ===== Live Stats ===== */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {statsEntries.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <StatsComparisonBar
                label={stat.label}
                homeValue={stat.home}
                awayValue={stat.away}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== Timeline + Live Analysis ===== */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Event Timeline */}
          <div className="lg:col-span-2">
            <GlassCard className="h-full">
              <h3 className="text-base font-semibold text-fie-text-primary mb-4">
                Match Events
              </h3>
              <div className="relative pl-4">
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-fie-border-primary" />
                <div className="space-y-4">
                  {timelineEvents.map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="relative flex items-start gap-3"
                    >
                      <div className="relative z-10 flex-shrink-0 mt-0.5">
                        {getEventIcon(event.type)}
                      </div>
                      <span className="text-xs font-semibold font-mono text-fie-text-secondary w-10 flex-shrink-0">
                        {event.minute}
                      </span>
                      <span className="text-sm text-fie-text-primary">
                        {event.description}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Live Analysis + Score Alive Grid */}
          <div className="lg:col-span-3 space-y-4">
            <GlassCard variant="purple">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-fie-text-primary">
                    FIE Live Analysis
                  </h3>
                  <span className="text-xs bg-[rgba(139,92,246,0.1)] text-fie-accent-purple rounded-full px-2 py-0.5">
                    AI-Generated
                  </span>
                </div>
                <span className="h-2 w-2 rounded-full bg-fie-accent-purple animate-pulse" />
              </div>
              <div className="text-sm text-fie-text-secondary leading-relaxed space-y-3">
                <p>
                  {minutes}&apos; — Man City maintain strong control with 54% possession.
                  Haaland&apos;s second goal (58&apos;) has shifted momentum decisively.
                  Liverpool&apos;s penalty (52&apos;) keeps them in contention but City&apos;s
                  home advantage and Class A motivation are proving decisive.
                </p>
                <p>
                  Key observation: Liverpool reduced to 10 effective players after
                  Van Dijk&apos;s yellow (67&apos;) — defensive discipline now critical.
                  Expected goals: City 2.3, Liverpool 1.1.
                </p>
                <p>
                  Script assessment: Main script (Home Win) probability increased to 78%.
                  Upset script probability declined to 12%.
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-fie-border-primary">
                <span className="flex items-center gap-1.5 text-[11px] text-fie-accent-purple">
                  <Radio className="h-3 w-3 animate-pulse" /> Live updating...
                </span>
                <span className="text-[11px] text-fie-text-muted">
                  Updated: {minutes}:{seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </GlassCard>

            {/* Correct Score Alive Tracker */}
            <GlassCard>
              <h3 className="text-base font-semibold text-fie-text-primary mb-1">
                Correct Score Tracker
              </h3>
              <p className="text-xs text-fie-text-muted mb-3">
                Scores still possible at {minutes}&apos;
              </p>
              <div className="grid grid-cols-5 gap-1.5">
                {scoreGrid.flat().map((cell, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02, duration: 0.3 }}
                    className={`flex items-center justify-center rounded-md h-10 text-xs font-mono font-semibold border transition-colors ${
                      cell.current
                        ? 'border-2 border-fie-accent-teal bg-[rgba(0,212,160,0.15)] text-fie-accent-teal animate-pulse'
                        : cell.alive
                        ? 'border-fie-accent-teal text-fie-accent-teal bg-[rgba(0,212,160,0.05)]'
                        : 'border-fie-border-primary text-fie-text-dim opacity-40 line-through'
                    }`}
                  >
                    {cell.home}-{cell.away}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.section>

      {/* ===== Script Tree ===== */}
      <motion.section variants={itemVariants}>
        <GlassCard>
          <h2 className="text-xl font-semibold text-fie-text-primary mb-1">
            Match Script Tree
          </h2>
          <p className="text-xs text-fie-text-muted mb-4">
            Three probable outcome paths based on current state
          </p>
          <div className="flex gap-3 text-xs mb-4">
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-fie-accent-teal" /> Main
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-fie-accent-warning" /> Upset
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-fie-accent-danger" /> Dead
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {branches.map((branch, bi) => (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: bi * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ y: -2 }}
                className="rounded-xl border border-fie-border-primary bg-[rgba(21,26,37,0.5)] p-4"
              >
                <div
                  className="rounded-lg px-3 py-1.5 mb-3"
                  style={{ backgroundColor: branch.bg }}
                >
                  <span
                    className="text-xs font-bold uppercase"
                    style={{ color: branch.color }}
                  >
                    {branch.name}
                  </span>
                </div>
                <p
                  className="text-2xl font-bold font-tabular mb-3"
                  style={{ color: branch.color }}
                >
                  {branch.prob}%
                </p>
                <div className="space-y-2">
                  {branch.steps.map((step, si) => (
                    <div key={si} className="flex items-start gap-2">
                      {step.done ? (
                        <CheckCircle className="h-4 w-4 text-fie-accent-teal flex-shrink-0 mt-0.5" />
                      ) : (
                        <ArrowRight
                          className="h-4 w-4 flex-shrink-0 mt-0.5"
                          style={{ color: branch.color, opacity: 0.5 }}
                        />
                      )}
                      <span
                        className={`text-sm ${
                          step.done ? 'text-fie-text-secondary' : 'text-fie-text-muted'
                        }`}
                      >
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
                {'note' in branch && (
                  <p className="mt-3 text-xs text-fie-accent-danger italic">
                    {branch.note}
                  </p>
                )}
                <div className="mt-3 h-1.5 rounded-full bg-fie-bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: branch.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${branch.prob}%` }}
                    transition={{ duration: 1, delay: 0.4 + bi * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.section>
    </motion.div>
  );
}
