import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { betSlips, performanceData } from '@/data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const statusStyles: Record<string, { border: string; label: string; badge: string }> = {
  alive: { border: 'border-fie-accent-teal', label: 'text-fie-accent-teal', badge: 'bg-[rgba(0,212,160,0.15)] text-fie-accent-teal' },
  risky: { border: 'border-fie-accent-warning', label: 'text-fie-accent-warning', badge: 'bg-[rgba(255,176,32,0.15)] text-fie-accent-warning' },
  dead: { border: 'border-fie-accent-danger', label: 'text-fie-accent-danger', badge: 'bg-[rgba(255,59,92,0.15)] text-fie-accent-danger' },
  won: { border: 'border-fie-accent-success', label: 'text-fie-accent-success', badge: 'bg-[rgba(0,230,118,0.15)] text-fie-accent-success' },
};

export default function Holding() {
  const totalPnL = performanceData.reduce((sum, d) => sum + d.pnl, 0);
  const winCount = betSlips.filter((b) => b.status === 'won' || (b.status === 'alive' && b.estReturn > 0)).length;
  const winRate = Math.round((winCount / betSlips.length) * 100);

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div custom={0} variants={fadeUp}>
        <h1 className="text-2xl md:text-3xl font-bold text-fie-text-primary">持仓管理</h1>
        <p className="text-sm text-fie-text-muted mt-1">追踪你的预测持仓与盈亏</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Wallet, label: '活跃持仓', value: betSlips.filter((b) => b.status === 'alive' || b.status === 'risky').length.toString(), color: 'text-fie-accent-teal' },
          { icon: totalPnL >= 0 ? TrendingUp : TrendingDown, label: '总盈亏', value: `${totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(1)}`, color: totalPnL >= 0 ? 'text-fie-accent-success' : 'text-fie-accent-danger' },
          { icon: TrendingUp, label: '胜率', value: `${winRate}%`, color: 'text-fie-accent-blue' },
          { icon: Wallet, label: '总投注', value: betSlips.reduce((s, b) => s + b.stake, 0).toFixed(0), color: 'text-fie-accent-warning' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.label} custom={i + 1} variants={fadeUp}>
              <GlassCard className="h-full">
                <Icon className={`h-5 w-5 ${card.color} mb-2`} />
                <p className="text-xs text-fie-text-muted">{card.label}</p>
                <p className={`text-xl font-bold font-mono font-tabular ${card.color}`}>{card.value}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Bet Slips */}
      <motion.div custom={5} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-fie-text-primary mb-3">投注单</h2>
        <div className="space-y-3">
          {betSlips.map((slip) => {
            const style = statusStyles[slip.status];
            return (
              <GlassCard
                key={slip.id}
                variant={slip.status === 'dead' ? 'danger' : slip.status === 'won' ? 'accent' : 'default'}
                className={`border-l-4 ${style.border}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{slip.homeFlag}</span>
                    <span className="text-sm font-medium text-fie-text-primary">{slip.match}</span>
                    <span>{slip.awayFlag}</span>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${style.badge}`}>
                    {slip.status.toUpperCase()}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-fie-text-secondary">
                      {slip.pick} @ <span className="font-mono font-semibold text-fie-text-primary">{slip.odds}</span>
                    </p>
                    <p className="text-xs text-fie-text-muted mt-0.5">
                      投注: {slip.stake} | 当前: {slip.currentScore}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-mono font-bold font-tabular ${slip.estReturn >= 0 ? 'text-fie-accent-success' : 'text-fie-accent-danger'}`}>
                      {slip.estReturn >= 0 ? '+' : ''}{slip.estReturn.toFixed(1)}
                    </p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </motion.div>

      {/* Risk Alert */}
      <motion.div custom={6} variants={fadeUp}>
        <GlassCard variant="warning">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-fie-accent-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-fie-accent-warning">风险提醒</h3>
              <p className="text-xs text-fie-text-secondary mt-1">
                波胆 2-1 预测目前处于高风险状态，比赛还剩 23 分钟。建议关注实时走势。
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Performance Chart */}
      <motion.div custom={7} variants={fadeUp}>
        <GlassCard>
          <h2 className="text-base font-semibold text-fie-text-primary mb-4">每日盈亏</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2940" />
                <XAxis dataKey="match" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151A25',
                    border: '1px solid #1E2940',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`${value >= 0 ? '+' : ''}${value}`, '盈亏']}
                />
                <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? '#00D4A0' : '#FF3B5C'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
