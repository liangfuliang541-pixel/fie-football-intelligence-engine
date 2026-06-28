import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Target,
  Crosshair,
  TrendingUp,
  Radio,
  ChevronRight,
  Zap,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import GlassCard from '@/components/GlassCard';
import MatchCard from '@/components/MatchCard';
import LiveIndicator from '@/components/LiveIndicator';
import { matches, featuredMatch, accuracyTrendData, leagues } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Home() {
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d'>('7d');
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLiveCount(12), 800);
    return () => clearTimeout(timer);
  }, []);

  const todayMatches = matches;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ===== Section 1: Hero ===== */}
      <motion.section variants={itemVariants}>
        <GlassCard className="relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <motion.h1
                className="text-3xl md:text-5xl font-extrabold tracking-tight text-gradient-accent"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              >
                FIE Intelligence Engine
              </motion.h1>
              <motion.p
                className="mt-2 text-sm text-fie-text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                v3.0 — Multi-Agent Roundtable System
              </motion.p>
              <motion.p
                className="mt-1 text-xs text-fie-text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Monday, March 31, 2025
              </motion.p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <LiveIndicator />
                  <span className="text-3xl font-bold font-mono text-fie-accent-danger font-tabular">
                    {liveCount}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-wider text-fie-text-muted">
                  LIVE MATCHES
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[rgba(0,230,118,0.1)] px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-fie-accent-success" />
                <span className="text-xs font-medium text-fie-accent-success">
                  System Online
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.section>

      {/* ===== Section 2: Stats Cards ===== */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard className="!p-4">
            <div className="flex items-start justify-between">
              <Calendar className="h-6 w-6 text-fie-accent-blue" />
              <span className="text-[11px] font-medium text-fie-accent-teal">+3 from yesterday</span>
            </div>
            <p className="mt-3 text-3xl font-bold text-fie-text-primary font-tabular">24</p>
            <p className="text-xs text-fie-text-muted mt-1">Today&apos;s Matches</p>
          </GlassCard>
          <GlassCard className="!p-4">
            <Target className="h-6 w-6 text-fie-accent-teal" />
            <p className="mt-3 text-3xl font-bold text-fie-accent-teal font-tabular">68.4%</p>
            <p className="text-xs text-fie-text-muted mt-1">7-Day Accuracy</p>
          </GlassCard>
          <GlassCard className="!p-4">
            <Crosshair className="h-6 w-6 text-fie-accent-warning" />
            <p className="mt-3 text-3xl font-bold text-fie-accent-warning font-tabular">23.1%</p>
            <p className="text-xs text-fie-text-muted mt-1">Correct Score Hit</p>
            <p className="text-[11px] text-fie-text-secondary">5/24 this week</p>
          </GlassCard>
          <GlassCard className="!p-4">
            <TrendingUp className="h-6 w-6 text-fie-accent-purple" />
            <p className="mt-3 text-3xl font-bold text-fie-accent-purple font-tabular">+142.5</p>
            <p className="text-xs text-fie-text-muted mt-1">Points Balance</p>
            <span className="inline-block mt-1 text-[11px] bg-[rgba(139,92,246,0.1)] text-fie-accent-purple rounded px-1.5 py-0.5">
              This month
            </span>
          </GlassCard>
        </div>
      </motion.section>

      {/* ===== Section 3: Featured Live Match + Schedule ===== */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Featured Live */}
          <GlassCard className="lg:col-span-3 !p-0 overflow-hidden" variant="accent">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-fie-accent-danger" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-fie-accent-danger">
                    Featured Live
                  </span>
                </div>
                <span className="text-xs bg-[rgba(59,130,246,0.1)] text-fie-accent-blue rounded-full px-2.5 py-1">
                  {featuredMatch.league}
                </span>
              </div>

              <div className="flex items-center justify-center gap-6 md:gap-10 py-4">
                <div className="text-center">
                  <span className="text-4xl">{featuredMatch.homeFlag}</span>
                  <p className="mt-2 text-lg md:text-2xl font-semibold text-fie-text-primary">
                    {featuredMatch.homeTeam}
                  </p>
                  <span className="text-xs text-fie-text-muted">(Home)</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-4xl md:text-6xl font-extrabold text-fie-text-primary font-tabular">
                      {featuredMatch.homeScore}
                    </span>
                    <span className="text-fie-text-dim text-2xl">-</span>
                    <span className="font-mono text-4xl md:text-6xl font-extrabold text-fie-text-primary font-tabular">
                      {featuredMatch.awayScore}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <LiveIndicator />
                    <span className="text-lg font-semibold text-fie-accent-danger">
                      LIVE {featuredMatch.liveMinute}&apos;
                    </span>
                  </div>
                  <span className="text-xs text-fie-text-muted">(HT: 1-0)</span>
                </div>
                <div className="text-center">
                  <span className="text-4xl">{featuredMatch.awayFlag}</span>
                  <p className="mt-2 text-lg md:text-2xl font-semibold text-fie-text-primary">
                    {featuredMatch.awayTeam}
                  </p>
                  <span className="text-xs text-fie-text-muted">(Away)</span>
                </div>
              </div>

              {/* Live Stats Row */}
              <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-fie-border-primary">
                {[
                  { label: 'Possession', home: '54%', away: '46%' },
                  { label: 'Shots', home: '12', away: '8' },
                  { label: 'SOT', home: '5', away: '3' },
                  { label: 'Corners', home: '6', away: '4' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-xs text-fie-text-muted mb-1">{stat.label}</p>
                    <p className="text-sm font-semibold text-fie-text-primary">
                      <span className="text-fie-accent-teal">{stat.home}</span>
                      {' - '}
                      <span className="text-fie-accent-blue">{stat.away}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <GlassCard className="!p-4 h-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-fie-text-primary">
                  Today&apos;s Schedule
                </h3>
                <span className="text-xs text-fie-accent-teal flex items-center gap-1 cursor-pointer hover:underline">
                  View All <ChevronRight className="h-3 w-3" />
                </span>
              </div>
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {todayMatches.map((match, i) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                  >
                    <MatchCard match={match} />
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.section>

      {/* ===== Section 4: Accuracy Trend Chart ===== */}
      <motion.section variants={itemVariants}>
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-fie-text-primary">
                Prediction Accuracy Trend
              </h3>
              <p className="text-xs text-fie-text-muted">Last 6 months — All predictions</p>
            </div>
            <div className="flex bg-fie-bg-secondary rounded-lg p-0.5">
              <button
                onClick={() => setChartPeriod('7d')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  chartPeriod === '7d'
                    ? 'bg-fie-accent-teal text-fie-bg-primary'
                    : 'text-fie-text-muted hover:text-fie-text-primary'
                }`}
              >
                7d
              </button>
              <button
                onClick={() => setChartPeriod('30d')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  chartPeriod === '30d'
                    ? 'bg-fie-accent-teal text-fie-bg-primary'
                    : 'text-fie-text-muted hover:text-fie-text-primary'
                }`}
              >
                30d
              </button>
            </div>
          </div>

          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accuracyTrendData}>
                <defs>
                  <linearGradient id="colorDir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4A0" stopOpacity={0.08} />
                    <stop offset="95%" stopColor="#00D4A0" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFB020" stopOpacity={0.08} />
                    <stop offset="95%" stopColor="#FFB020" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOU" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.08} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#1E2940" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  axisLine={{ stroke: '#1E2940' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(21, 26, 37, 0.95)',
                    border: '1px solid #1E2940',
                    borderRadius: '12px',
                    backdropFilter: 'blur(12px)',
                    fontSize: '12px',
                  }}
                  labelStyle={{ color: '#E2E8F0' }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
                  iconType="circle"
                  iconSize={8}
                />
                <Area
                  type="monotone"
                  dataKey="direction"
                  name="Direction"
                  stroke="#00D4A0"
                  strokeWidth={2}
                  fill="url(#colorDir)"
                />
                <Area
                  type="monotone"
                  dataKey="correctScore"
                  name="Correct Score"
                  stroke="#FFB020"
                  strokeWidth={2}
                  fill="url(#colorCS)"
                />
                <Area
                  type="monotone"
                  dataKey="overUnder"
                  name="Over/Under"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#colorOU)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.section>

      {/* ===== Section 5: League Quick Access ===== */}
      <motion.section variants={itemVariants}>
        <GlassCard>
          <h3 className="text-lg font-semibold text-fie-text-primary mb-4">
            Browse by League
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {leagues.map((league, i) => (
              <motion.div
                key={league.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                whileHover={{ y: -3, borderColor: '#00D4A0', transition: { duration: 0.2 } }}
                className="flex flex-col items-center gap-2 rounded-xl border border-fie-border-primary bg-[rgba(21,26,37,0.5)] p-4 cursor-pointer transition-colors"
              >
                <span className="text-3xl">{league.flag}</span>
                <span className="text-sm font-semibold text-fie-text-primary text-center leading-tight">
                  {league.name}
                </span>
                <span className="text-xs text-fie-text-muted">{league.count} matches</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.section>

      {/* ===== Section 6: Roundtable Activity ===== */}
      <motion.section variants={itemVariants}>
        <GlassCard variant="purple">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-fie-accent-purple" />
              <h3 className="text-lg font-semibold text-fie-text-primary">
                Latest Roundtable Analysis
              </h3>
            </div>
            <span className="text-xs bg-[rgba(139,92,246,0.1)] text-fie-accent-purple rounded-full px-2.5 py-1">
              10 Agents
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-fie-text-primary">
                Man City vs Liverpool
              </p>
              <p className="text-xs text-fie-text-muted">Today 20:00</p>
              <div className="flex gap-1.5 mt-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05, type: 'spring' }}
                    className={`h-2 w-2 rounded-full ${
                      i < 8
                        ? 'bg-fie-accent-success'
                        : i < 9
                        ? 'bg-fie-accent-purple animate-pulse'
                        : 'bg-fie-text-dim'
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-fie-text-secondary line-clamp-2">
                Converged prediction: Home Win (72%) — Strong agreement across all agents
                on home advantage. Tactical and Form agents show highest confidence.
              </p>
            </div>
            <button className="shrink-0 text-sm font-medium text-fie-accent-teal bg-[rgba(0,212,160,0.1)] border border-[rgba(0,212,160,0.2)] rounded-lg px-4 py-2 hover:bg-[rgba(0,212,160,0.15)] transition-colors">
              View Full Analysis →
            </button>
          </div>
        </GlassCard>
      </motion.section>
    </motion.div>
  );
}
