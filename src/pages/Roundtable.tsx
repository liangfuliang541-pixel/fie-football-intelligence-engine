import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Target, TrendingUp } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { agents, roundtableReport, agentWeights } from '@/data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Roundtable() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const consensus = agents[agents.length - 1];

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div custom={0} variants={fadeUp}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(139,92,246,0.15)]">
            <Users className="h-5 w-5 text-fie-accent-purple" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-fie-text-primary">多 Agent 圆桌讨论</h1>
            <p className="text-sm text-fie-text-muted">10 个独立 AI Agent 并行分析，交叉验证共识</p>
          </div>
        </div>
      </motion.div>

      {/* Agent Orbit + Consensus */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Agent Selection */}
        <motion.div custom={1} variants={fadeUp} className="lg:col-span-2">
          <GlassCard className="h-full">
            <h2 className="text-base font-semibold text-fie-text-primary mb-3">分析 Agent</h2>
            <div className="space-y-2">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`w-full flex items-center gap-3 rounded-xl p-3 transition-all text-left ${
                    selectedAgent.id === agent.id
                      ? 'bg-[rgba(139,92,246,0.1)] border border-fie-accent-purple'
                      : 'bg-fie-bg-secondary border border-transparent hover:border-fie-border-hover'
                  }`}
                >
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: agent.color }}
                  >
                    {agent.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-fie-text-primary truncate">{agent.name}</p>
                    <p className="text-[11px] text-fie-text-muted truncate">{agent.role}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-mono font-semibold" style={{ color: agent.color }}>
                      {agent.confidence}%
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Agent Detail + Consensus */}
        <motion.div custom={2} variants={fadeUp} className="lg:col-span-3 space-y-4">
          {/* Selected Agent Detail */}
          <GlassCard>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ backgroundColor: selectedAgent.color }}
              >
                {selectedAgent.name[0]}
              </div>
              <div>
                <h3 className="text-base font-semibold text-fie-text-primary">{selectedAgent.name}</h3>
                <p className="text-xs text-fie-text-muted">{selectedAgent.role}</p>
              </div>
              <div className="ml-auto">
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: selectedAgent.color }}
                >
                  {selectedAgent.confidence}%
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-fie-text-muted mb-1">分析结论</p>
                <p className="text-sm text-fie-text-primary bg-fie-bg-secondary rounded-lg p-3">
                  {selectedAgent.conclusion}
                </p>
              </div>
              <div>
                <p className="text-xs text-fie-text-muted mb-1">详细分析</p>
                <p className="text-sm text-fie-text-secondary leading-relaxed">
                  {selectedAgent.analysis}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-fie-accent-teal flex-shrink-0 mt-0.5" />
                <p className="text-xs text-fie-accent-teal">{selectedAgent.keyFinding}</p>
              </div>
            </div>
          </GlassCard>

          {/* Consensus Card */}
          <GlassCard variant="accent">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="h-5 w-5 text-fie-accent-teal" />
              <h3 className="text-base font-semibold text-fie-text-primary">共识结论</h3>
              <span className="ml-auto rounded-full bg-fie-accent-teal px-3 py-1 text-xs font-bold text-fie-bg-primary">
                {consensus.confidence}% 信心
              </span>
            </div>
            <p className="text-sm text-fie-text-primary leading-relaxed">{consensus.conclusion}</p>
            <div className="mt-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-fie-accent-success" />
              <span className="text-xs text-fie-accent-success">{consensus.keyFinding}</span>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Full Report */}
      <motion.div custom={3} variants={fadeUp}>
        <GlassCard>
          <h2 className="text-lg font-semibold text-fie-text-primary mb-4">中文共识研判报告</h2>
          <div className="prose prose-invert prose-sm max-w-none">
            {roundtableReport.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h3 key={i} className="text-base font-semibold text-fie-accent-teal mt-4 mb-2">{line.replace('## ', '')}</h3>;
              }
              if (line.startsWith('### ')) {
                return <h4 key={i} className="text-sm font-semibold text-fie-text-primary mt-3 mb-1">{line.replace('### ', '')}</h4>;
              }
              if (line.startsWith('| ')) {
                return null; // Skip table rows for now
              }
              if (line.startsWith('**')) {
                return <p key={i} className="text-sm font-semibold text-fie-accent-warning my-2">{line.replace(/\*\*/g, '')}</p>;
              }
              if (line.trim() === '') return null;
              return <p key={i} className="text-sm text-fie-text-secondary my-1">{line}</p>;
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* Agent Weights Chart */}
      <motion.div custom={4} variants={fadeUp}>
        <GlassCard>
          <h2 className="text-base font-semibold text-fie-text-primary mb-4">Agent 贡献权重</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentWeights} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2940" />
                <XAxis type="number" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151A25',
                    border: '1px solid #1E2940',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`${value}%`, '权重']}
                />
                <Bar dataKey="weight" radius={[0, 4, 4, 0]}>
                  {agentWeights.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
