import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Target, Award, Radio, Users } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import MatchCard from '@/components/MatchCard';
import { matches, accuracyTrendData, leagues, agents } from '@/data/mockData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const statCards = [
  { icon: LayoutDashboard, label: '今日比赛', value: '12', sub: '3场进行中', color: 'text-fie-accent-teal' },
  { icon: TrendingUp, label: '7日准确率', value: '71%', sub: '+3%', color: 'text-fie-accent-success' },
  { icon: Target, label: '波胆命中', value: '26%', sub: '+2%', color: 'text-fie-accent-blue' },
  { icon: Award, label: '累计积分', value: '+156', sub: '本赛季', color: 'text-fie-accent-warning' },
];

export default function Home() {
  const navigate = useNavigate();
  const featured = matches[0];
  const todayMatches = matches.slice(0, 6);

  const [trendPeriod, setTrendPeriod] = useState<'7D' | '30D'>('7D');

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero */}
      <motion.div custom={0} variants={fadeUp}>
        <h1 className="text-3xl md:text-4xl font-bold text-gradient-accent">
          FIE 智能预测引擎
        </h1>
        <p className="mt-1 text-sm text-fie-text-muted">
          Football Intelligence Engine — 足球世界的数字孪生
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.label} custom={i + 1} variants={fadeUp}>
              <GlassCard className="h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-fie-text-muted">{card.label}</p>
                    <p className={`text-2xl font-bold font-mono font-tabular mt-1 ${card.color}`}>
                      {card.value}
                    </p>
                    <p className="text-[11px] text-fie-text-muted mt-0.5">{card.sub}</p>
                  </div>
                  <Icon className={`h-5 w-5 ${card.color} opacity-60`} />
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Match + Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Featured */}
        <motion.div custom={5} variants={fadeUp} className="lg:col-span-3">
          <GlassCard variant="accent" className="h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-fie-text-primary">焦点赛事</h2>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-fie-accent-danger">
                <Radio className="h-3.5 w-3.5" /> LIVE {featured.liveMinute}'
              </span>
            </div>

            <div className="flex items-center justify-center gap-8 py-4">
              <div className="text-center">
                <span className="text-4xl">{featured.homeFlag}</span>
                <h3 className="mt-1 text-lg font-bold">{featured.homeTeam}</h3>
              </div>
              <div className="text-center">
                <span className="font-mono text-4xl font-bold text-fie-text-primary font-tabular">
                  {featured.homeScore} - {featured.awayScore}
                </span>
              </div>
              <div className="text-center">
                <span className="text-4xl">{featured.awayFlag}</span>
                <h3 className="mt-1 text-lg font-bold">{featured.awayTeam}</h3>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs text-fie-text-secondary">
              <div className="rounded-lg bg-fie-bg-secondary py-2">
                <p className="text-fie-accent-teal font-bold">54%</p>
                <p>控球率</p>
              </div>
              <div className="rounded-lg bg-fie-bg-secondary py-2">
                <p className="text-fie-accent-teal font-bold">12 / 8</p>
                <p>射门</p>
              </div>
              <div className="rounded-lg bg-fie-bg-secondary py-2">
                <p className="text-fie-accent-teal font-bold">5 / 3</p>
                <p>射正</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Today's Schedule */}
        <motion.div custom={6} variants={fadeUp} className="lg:col-span-2">
          <GlassCard className="h-full">
            <h2 className="text-base font-semibold text-fie-text-primary mb-3">今日赛程</h2>
            <div className="space-y-2">
              {todayMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Accuracy Trend + Leagues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend Chart */}
        <motion.div custom={7} variants={fadeUp} className="lg:col-span-2">
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-fie-text-primary">准确率趋势</h2>
              <div className="flex gap-1">
                {(['7D', '30D'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setTrendPeriod(p)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                      trendPeriod === p
                        ? 'bg-fie-accent-teal text-fie-bg-primary'
                        : 'bg-fie-bg-secondary text-fie-text-muted'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accuracyTrendData}>
                  <defs>
                    <linearGradient id="colorDir" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4A0" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00D4A0" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2940" />
                  <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#151A25',
                      border: '1px solid #1E2940',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Area type="monotone" dataKey="direction" stroke="#00D4A0" strokeWidth={2} fill="url(#colorDir)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Leagues */}
        <motion.div custom={8} variants={fadeUp}>
          <GlassCard className="h-full">
            <h2 className="text-base font-semibold text-fie-text-primary mb-3">热门联赛</h2>
            <div className="grid grid-cols-2 gap-2">
              {leagues.map((league) => (
                <button
                  key={league.name}
                  onClick={() => navigate('/matches')}
                  className="flex items-center gap-2 rounded-xl bg-fie-bg-secondary p-3 transition-all hover:bg-fie-bg-card-hover hover:-translate-y-px"
                >
                  <span className="text-2xl">{league.flag}</span>
                  <div className="text-left">
                    <p className="text-xs font-medium text-fie-text-primary">{league.name}</p>
                    <p className="text-[10px] text-fie-text-muted">{league.count} 场比赛</p>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Roundtable Preview */}
      <motion.div custom={9} variants={fadeUp}>
        <GlassCard variant="purple" className="cursor-pointer" onClick={() => navigate('/roundtable')}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(139,92,246,0.15)]">
                <Users className="h-5 w-5 text-fie-accent-purple" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-fie-text-primary">多 Agent 圆桌讨论</h2>
                <p className="text-xs text-fie-text-muted">{agents.length} 个 AI Agent 并行分析，交叉验证</p>
              </div>
            </div>
            <span className="rounded-lg bg-fie-accent-purple px-3 py-1.5 text-xs font-semibold text-white">
              进入圆桌 →
            </span>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
