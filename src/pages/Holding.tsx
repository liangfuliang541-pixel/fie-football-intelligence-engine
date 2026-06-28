import { motion } from 'framer-motion';
import {
  FileText,
  TrendingUp,
  Wallet,
  ShieldAlert,
  AlertTriangle,
  Radio,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import GlassCard from '@/components/GlassCard';
import { betSlips, performanceData } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const statusConfig = {
  alive: {
    border: 'border-l-4 border-l-fie-accent-success',
    labelColor: 'text-fie-accent-success',
    icon: CheckCircle,
  },
  risky: {
    border: 'border-l-4 border-l-fie-accent-warning',
    labelColor: 'text-fie-accent-warning',
    icon: AlertCircle,
  },
  dead: {
    border: 'border-l-4 border-l-fie-accent-danger',
    labelColor: 'text-fie-accent-danger',
    icon: XCircle,
  },
  won: {
    border: 'border-l-4 border-l-fie-accent-success',
    labelColor: 'text-fie-accent-success',
    icon: CheckCircle,
  },
};

export default function Holding() {
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
          Portfolio Tracker
        </h1>
        <p className="text-sm text-fie-text-muted mt-1">
          Monitor your active positions and risk exposure
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard className="!p-4">
            <FileText className="h-6 w-6 text-fie-accent-blue" />
            <p className="mt-3 text-3xl font-bold text-fie-text-primary font-tabular">8</p>
            <p className="text-xs text-fie-text-muted mt-1">Active Holdings</p>
            <p className="text-[11px] text-fie-text-secondary">3 matches today</p>
          </GlassCard>
          <GlassCard className="!p-4">
            <TrendingUp className="h-6 w-6 text-fie-accent-success" />
            <p className="mt-3 text-3xl font-bold text-fie-accent-success font-tabular">+47.5</p>
            <p className="text-xs text-fie-text-muted mt-1">Est. P&L (Points)</p>
            <p className="text-[11px] text-fie-text-secondary">Based on live match states</p>
          </GlassCard>
          <GlassCard className="!p-4">
            <Wallet className="h-6 w-6 text-fie-accent-purple" />
            <p className="mt-3 text-3xl font-bold text-fie-accent-purple font-tabular">125.0</p>
            <p className="text-xs text-fie-text-muted mt-1">Total Staked</p>
            <p className="text-[11px] text-fie-text-secondary">Across all active positions</p>
          </GlassCard>
          <GlassCard className="!p-4">
            <ShieldAlert className="h-6 w-6 text-fie-accent-warning" />
            <p className="mt-3 text-3xl font-bold text-fie-accent-warning">Medium</p>
            <p className="text-xs text-fie-text-muted mt-1">Risk Level</p>
            <div className="mt-2 h-1.5 rounded-full bg-fie-bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full gradient-probability"
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              />
            </div>
          </GlassCard>
        </div>
      </motion.section>

      {/* Active Bet Slips */}
      <motion.section variants={itemVariants}>
        <h2 className="text-lg font-semibold text-fie-text-primary mb-3">
          Active Positions
        </h2>
        <div className="space-y-3">
          {betSlips.map((slip, i) => {
            const config = statusConfig[slip.status];
            const StatusIcon = config.icon;
            return (
              <motion.div
                key={slip.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <div
                  className={`rounded-xl border border-fie-border-primary bg-[rgba(21,26,37,0.5)] p-4 ${config.border} transition-all duration-200 hover:border-fie-border-hover hover:-translate-y-px`}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{slip.homeFlag}</span>
                      <span className="text-sm font-medium text-fie-text-primary">
                        {slip.match}
                      </span>
                      <span className="text-base">{slip.awayFlag}</span>
                      {slip.liveMinute && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-fie-accent-danger">
                          <Radio className="h-3 w-3" /> {slip.liveMinute}&apos;
                        </span>
                      )}
                      {slip.isFinished && (
                        <span className="text-xs bg-[rgba(0,230,118,0.1)] text-fie-accent-success rounded px-1.5 py-0.5">
                          Finished
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Middle row */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs bg-[rgba(59,130,246,0.1)] text-fie-accent-blue rounded-md px-2 py-0.5 font-medium">
                      {slip.pickType}
                    </span>
                    <span className="text-base font-semibold text-fie-text-primary">
                      {slip.pick}
                    </span>
                    <span className="text-xs font-semibold text-fie-accent-blue bg-[rgba(59,130,246,0.1)] rounded-md px-2 py-0.5">
                      @ {slip.odds}
                    </span>
                  </div>
                  {/* Bottom row */}
                  <div className="flex items-center justify-between pt-2 border-t border-fie-border-primary">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-fie-text-muted">
                        Stake: {slip.stake.toFixed(1)} pts
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          slip.estReturn >= 0 ? 'text-fie-accent-success' : 'text-fie-accent-danger'
                        }`}
                      >
                        Est: {slip.estReturn >= 0 ? '+' : ''}
                        {slip.estReturn.toFixed(1)} pts
                      </span>
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold ${config.labelColor}`}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      {slip.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Risk Alerts */}
      <motion.section variants={itemVariants}>
        <GlassCard variant="warning">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-fie-accent-warning" />
            <h3 className="text-base font-semibold text-fie-text-primary">
              Risk Alerts
            </h3>
          </div>
          <div className="space-y-3">
            <div className="rounded-lg border-2 border-fie-accent-warning bg-[rgba(255,176,32,0.05)] p-3">
              <p className="text-sm font-semibold text-fie-accent-warning">
                Max Threat Score: 35
              </p>
              <p className="text-sm text-fie-text-secondary mt-1">
                Your combined exposure on Man City vs Liverpool exceeds recommended
                maximum (30). Consider hedging your Correct Score 2-1 position.
              </p>
              <p className="text-xs text-fie-accent-blue mt-2">
                Hedge option: Place small counter-bet on Liverpool Win @ 4.17 to limit downside
              </p>
              <button className="mt-2 text-xs font-medium text-fie-accent-warning bg-[rgba(255,176,32,0.1)] border border-[rgba(255,176,32,0.3)] rounded-lg px-3 py-1.5 hover:bg-[rgba(255,176,32,0.15)] transition-colors">
                View Hedge Options
              </button>
            </div>
            <div className="rounded-lg border border-fie-accent-danger bg-[rgba(255,59,92,0.03)] p-3">
              <p className="text-sm font-semibold text-fie-accent-danger">
                Over-concentration: Premier League
              </p>
              <p className="text-sm text-fie-text-secondary mt-1">
                67% of active stake is on Premier League matches. Diversify across
                leagues to reduce correlated risk.
              </p>
              <p className="text-xs text-fie-accent-blue mt-2">
                Consider Bundesliga or La Liga opportunities today
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.section>

      {/* Daily Performance Chart */}
      <motion.section variants={itemVariants}>
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-fie-text-primary">
              Today&apos;s Performance
            </h3>
            <span className="text-base font-semibold text-fie-accent-success">
              +47.5 pts
            </span>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="4 4" stroke="#1E2940" vertical={false} />
                <XAxis
                  dataKey="match"
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  axisLine={{ stroke: '#1E2940' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}pts`}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(21, 26, 37, 0.95)',
                    border: '1px solid #1E2940',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  labelStyle={{ color: '#E2E8F0' }}
                  formatter={(value: number) => [`${value > 0 ? '+' : ''}${value} pts`, 'P&L']}
                />
                <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                  {performanceData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.pnl > 0 ? '#00E676' : entry.pnl < 0 ? '#FF3B5C' : '#64748B'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.section>
    </motion.div>
  );
}
