import { motion } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Lightbulb,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import GlassCard from '@/components/GlassCard';
import { reviewData } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Review() {
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
          Post-Match Review
        </h1>
        <p className="text-sm text-fie-text-muted mt-1">
          Prediction accuracy analysis and model improvement
        </p>
      </motion.div>

      {/* Match Result Header */}
      <motion.section variants={itemVariants}>
        <GlassCard>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-6 md:gap-12 py-4">
              <div className="text-center md:text-right">
                <span className="text-5xl">\uD83C\uDDEC\uD83C\uDDE7</span>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-fie-text-primary">
                  Man City
                </h2>
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
                <span className="mt-2 inline-block text-xs bg-[rgba(0,230,118,0.1)] text-fie-accent-success rounded-full px-3 py-1 font-medium">
                  FINISHED
                </span>
              </div>
              <div className="text-center md:text-left">
                <span className="text-5xl">\uD83C\uDDEC\uD83C\uDDE7</span>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-fie-text-primary">
                  Liverpool
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-fie-text-muted">
              <span>March 31, 2025</span>
              <span className="bg-[rgba(59,130,246,0.1)] text-fie-accent-blue rounded-full px-2 py-0.5">
                Premier League — Round 31
              </span>
              <span>Etihad Stadium</span>
            </div>
          </div>
        </GlassCard>
      </motion.section>

      {/* Prediction vs Actual */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-fie-text-primary">
                Pre-Match Predictions
              </h3>
              <span className="text-xs bg-[rgba(59,130,246,0.1)] text-fie-accent-blue rounded-full px-2 py-0.5">
                Before Match
              </span>
            </div>
            <div className="space-y-0">
              {reviewData.predictions.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between py-2.5 border-b border-fie-border-primary last:border-0"
                >
                  <span className="text-xs text-fie-text-muted">{p.label}</span>
                  <span className="text-sm font-semibold text-fie-text-primary">{p.predicted}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-fie-text-primary">
                Actual Results
              </h3>
              <span className="text-xs bg-[rgba(0,230,118,0.1)] text-fie-accent-success rounded-full px-2 py-0.5">
                Final
              </span>
            </div>
            <div className="space-y-0">
              {reviewData.results.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center justify-between py-2.5 border-b border-fie-border-primary last:border-0 ${
                    r.hit ? 'bg-[rgba(0,230,118,0.03)]' : 'bg-[rgba(255,59,92,0.03)]'
                  }`}
                >
                  <span className="text-xs text-fie-text-muted">{r.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-fie-text-primary">
                      {r.actual}
                    </span>
                    {r.hit ? (
                      <CheckCircle className="h-4 w-4 text-fie-accent-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-fie-accent-danger" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </motion.section>

      {/* Radar Chart */}
      <motion.section variants={itemVariants}>
        <GlassCard>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-fie-text-primary">
                Multi-Dimension Scoring
              </h2>
              <p className="text-xs text-fie-text-muted">
                Prediction accuracy across all tracked dimensions
              </p>
            </div>
            <div className="text-right mt-2 md:mt-0">
              <p className="font-mono text-3xl md:text-5xl font-extrabold text-fie-accent-teal font-tabular">
                92<span className="text-lg text-fie-text-muted">/100</span>
              </p>
            </div>
          </div>
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={reviewData.radarScores}>
                <PolarGrid
                  stroke="#1E2940"
                  strokeDasharray="4 4"
                />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#64748B', fontSize: 10 }}
                  axisLine={false}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#00D4A0"
                  strokeWidth={2}
                  fill="rgba(0, 212, 160, 0.15)"
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(21, 26, 37, 0.95)',
                    border: '1px solid #1E2940',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`${value}/100`, 'Score']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {reviewData.radarScores.map((dim) => (
              <span
                key={dim.dimension}
                className={`text-xs font-medium rounded-lg px-2.5 py-1 ${
                  dim.score >= 90
                    ? 'bg-[rgba(0,230,118,0.1)] text-fie-accent-success'
                    : dim.score >= 70
                    ? 'bg-[rgba(0,212,160,0.1)] text-fie-accent-teal'
                    : dim.score >= 50
                    ? 'bg-[rgba(255,176,32,0.1)] text-fie-accent-warning'
                    : 'bg-[rgba(255,59,92,0.1)] text-fie-accent-danger'
                }`}
              >
                {dim.dimension}: {dim.score}
              </span>
            ))}
          </div>
        </GlassCard>
      </motion.section>

      {/* Hit & Miss Lists */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-fie-accent-success" />
              <h3 className="text-base font-semibold text-fie-accent-success">
                Predictions Hit
              </h3>
              <span className="text-xs bg-[rgba(0,230,118,0.1)] text-fie-accent-success rounded-full px-2 py-0.5">
                5/6
              </span>
            </div>
            <div className="space-y-2">
              {reviewData.hits.map((hit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 py-2"
                >
                  <CheckCircle className="h-4 w-4 text-fie-accent-success flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-fie-text-primary">{hit.name}</p>
                    <p className="text-xs text-fie-text-secondary">
                      Predicted: {hit.predicted} → Actual:{' '}
                      <span className="text-fie-accent-success">{hit.actual}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-fie-border-primary">
              <p className="text-base font-semibold text-fie-accent-success">
                Hit Rate: 83%
              </p>
              <div className="mt-2 h-2 rounded-full bg-fie-bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-fie-accent-success"
                  initial={{ width: 0 }}
                  animate={{ width: '83%' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="h-5 w-5 text-fie-accent-warning" />
              <h3 className="text-base font-semibold text-fie-accent-warning">
                Predictions Missed
              </h3>
              <span className="text-xs bg-[rgba(255,176,32,0.1)] text-fie-accent-warning rounded-full px-2 py-0.5">
                1/6
              </span>
            </div>
            {reviewData.misses.map((miss, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="py-2"
              >
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-fie-accent-warning flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-fie-text-primary">{miss.name}</p>
                    <p className="text-xs text-fie-text-secondary">
                      Predicted: {miss.predicted} → Actual:{' '}
                      <span className="text-fie-accent-warning">{miss.actual}</span>
                    </p>
                    <p className="text-xs text-fie-text-muted">{miss.deviation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="mt-3 p-3 rounded-lg bg-[rgba(255,176,32,0.05)] border border-[rgba(255,176,32,0.1)]">
              <p className="text-sm text-fie-text-secondary">
                Corner prediction slightly underestimated. Liverpool generated more corners
                than expected in the final 15 minutes as they pushed for an equalizer.
              </p>
            </div>
          </GlassCard>
        </div>
      </motion.section>

      {/* New Model Rules Learned */}
      <motion.section variants={itemVariants}>
        <GlassCard variant="purple">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-fie-accent-purple" />
            <h3 className="text-base font-semibold text-fie-accent-purple">
              New Rules Learned
            </h3>
            <span className="text-xs bg-[rgba(139,92,246,0.1)] text-fie-accent-purple rounded-full px-2 py-0.5">
              Model Update
            </span>
          </div>
          <div className="space-y-3">
            {reviewData.newRules.map((rule, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="rounded-xl border border-fie-accent-purple bg-[rgba(139,92,246,0.03)] p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-fie-accent-purple">
                    {rule.title}
                  </h4>
                  <span
                    className={`text-xs rounded-full px-2 py-0.5 ${
                      rule.confidence === 'High'
                        ? 'bg-[rgba(0,212,160,0.1)] text-fie-accent-teal'
                        : 'bg-[rgba(255,176,32,0.1)] text-fie-accent-warning'
                    }`}
                  >
                    Confidence: {rule.confidence}
                  </span>
                </div>
                <p className="text-sm text-fie-text-secondary leading-relaxed">
                  {rule.description}
                </p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.section>
    </motion.div>
  );
}
