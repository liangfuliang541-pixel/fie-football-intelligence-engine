import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  AlertTriangle,
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import ProbabilityBar from '@/components/ProbabilityBar';
import FormIndicator from '@/components/FormIndicator';
import MotivationBadge from '@/components/MotivationBadge';
import { predictionData } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function PreMatch() {
  const [bookmarked, setBookmarked] = useState(false);
  const pd = predictionData;

  const homeForm: ('W' | 'D' | 'L')[] = ['W', 'W', 'D', 'W', 'W'];
  const awayForm: ('W' | 'D' | 'L')[] = ['W', 'W', 'W', 'D', 'L'];

  const scoreGrid = pd.scoreGrid;
  const homeGoalsList = [0, 1, 2, 3];
  const awayGoalsList = [0, 1, 2, 3, 4, 5];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ===== Match Header ===== */}
      <motion.section variants={itemVariants}>
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-fie-text-muted">
              Matches &gt; Premier League &gt; Match #2847
            </span>
            <button onClick={() => setBookmarked(!bookmarked)}>
              <Star
                className={`h-5 w-5 transition-colors ${
                  bookmarked ? 'text-fie-accent-warning fill-fie-accent-warning' : 'text-fie-text-muted'
                }`}
              />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 py-4">
            <div className="text-center md:text-right">
              <span className="text-5xl">🇬🇧</span>
              <h2 className="mt-2 text-xl md:text-3xl font-bold text-fie-text-primary">
                Manchester City
              </h2>
              <span className="text-xs text-fie-text-muted">(Home)</span>
            </div>

            <div className="text-center">
              <div className="bg-fie-bg-secondary rounded-xl px-5 py-2.5">
                <span className="text-xl font-extrabold text-fie-text-dim">VS</span>
              </div>
              <p className="mt-2 text-sm text-fie-text-secondary">Today 20:00</p>
            </div>

            <div className="text-center md:text-left">
              <span className="text-5xl">🇬🇧</span>
              <h2 className="mt-2 text-xl md:text-3xl font-bold text-fie-text-primary">
                Liverpool
              </h2>
              <span className="text-xs text-fie-text-muted">(Away)</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {[
              { label: 'Premier League — Round 31', color: 'text-fie-accent-blue bg-[rgba(59,130,246,0.1)]' },
              { label: 'Etihad Stadium', color: 'text-fie-text-secondary bg-[rgba(255,255,255,0.03)]' },
              { label: 'Ref: M. Oliver', color: 'text-fie-text-secondary bg-[rgba(255,255,255,0.03)]' },
              { label: '☁️ 14°C', color: 'text-fie-text-secondary bg-[rgba(255,255,255,0.03)]' },
            ].map((pill) => (
              <motion.span
                key={pill.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`rounded-full px-3 py-1 text-xs font-medium ${pill.color}`}
              >
                {pill.label}
              </motion.span>
            ))}
          </div>
        </GlassCard>
      </motion.section>

      {/* ===== Team Form & Motivation ===== */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-fie-text-primary">
                <span className="text-xl mr-2">🇬🇧</span>
                Manchester City
              </h3>
              <span className="text-xs bg-[rgba(0,212,160,0.1)] text-fie-accent-teal rounded-full px-2 py-0.5">
                1st
              </span>
            </div>
            <p className="text-xs text-fie-text-muted mb-2">Last 5</p>
            <FormIndicator results={homeForm} />
            <div className="mt-3 flex items-center gap-2">
              <MotivationBadge grade="A" />
              <span className="text-xs text-fie-text-secondary">
                Title race — Must win to maintain lead
              </span>
            </div>
            <div className="mt-3">
              <ProbabilityBar label="Motivation Score" value={95} color="success" />
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-fie-text-primary">
                Liverpool
                <span className="text-xl ml-2">🇬🇧</span>
              </h3>
              <span className="text-xs bg-[rgba(0,212,160,0.1)] text-fie-accent-teal rounded-full px-2 py-0.5">
                2nd
              </span>
            </div>
            <p className="text-xs text-fie-text-muted mb-2">Last 5</p>
            <FormIndicator results={awayForm} />
            <div className="mt-3 flex items-center gap-2">
              <MotivationBadge grade="B" />
              <span className="text-xs text-fie-text-secondary">
                Title challenge — Need points to keep pressure
              </span>
            </div>
            <div className="mt-3">
              <ProbabilityBar label="Motivation Score" value={88} color="teal" />
            </div>
          </GlassCard>
        </div>
      </motion.section>

      {/* ===== WDL Probability ===== */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold text-fie-text-primary mb-1">
          Match Outcome Prediction
        </h2>
        <p className="text-xs text-fie-text-muted mb-4">
          Based on historical data + current form + motivation analysis
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Home Win */}
          <GlassCard variant="accent">
            <span className="text-xs font-semibold uppercase text-fie-accent-teal">Home Win</span>
            <p className="text-sm text-fie-text-secondary mt-1">Man City</p>
            <p className="text-4xl font-extrabold font-mono text-fie-accent-teal font-tabular mt-2">
              {pd.wdl.home}%
            </p>
            <span className="inline-block mt-2 text-xs font-semibold text-fie-accent-blue bg-[rgba(59,130,246,0.1)] rounded-md px-2.5 py-1">
              1.92
            </span>
            <ProbabilityBar label="" value={pd.wdl.home} color="teal" showPercent={false} barHeight={3} />
          </GlassCard>

          {/* Draw */}
          <GlassCard variant="warning">
            <span className="text-xs font-semibold uppercase text-fie-accent-warning">Draw</span>
            <p className="text-4xl font-extrabold font-mono text-fie-accent-warning font-tabular mt-4">
              {pd.wdl.draw}%
            </p>
            <span className="inline-block mt-2 text-xs font-semibold text-fie-accent-blue bg-[rgba(59,130,246,0.1)] rounded-md px-2.5 py-1">
              4.17
            </span>
            <ProbabilityBar label="" value={pd.wdl.draw} color="warning" showPercent={false} barHeight={3} />
          </GlassCard>

          {/* Away Win */}
          <GlassCard variant="danger">
            <span className="text-xs font-semibold uppercase text-fie-accent-danger">Away Win</span>
            <p className="text-sm text-fie-text-secondary mt-1">Liverpool</p>
            <p className="text-4xl font-extrabold font-mono text-fie-accent-danger font-tabular mt-2">
              {pd.wdl.away}%
            </p>
            <span className="inline-block mt-2 text-xs font-semibold text-fie-accent-blue bg-[rgba(59,130,246,0.1)] rounded-md px-2.5 py-1">
              4.17
            </span>
            <ProbabilityBar label="" value={pd.wdl.away} color="danger" showPercent={false} barHeight={3} />
          </GlassCard>
        </div>
      </motion.section>

      {/* ===== Over/Under ===== */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard>
            <h3 className="text-base font-semibold text-fie-text-primary mb-3">
              Total Goals — Over/Under 2.5
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-fie-accent-teal">Over 2.5</span>
                  <span className="text-xl font-bold font-mono text-fie-accent-teal font-tabular">
                    {pd.overUnder25.over}%
                  </span>
                </div>
                <ProbabilityBar label="" value={pd.overUnder25.over} color="teal" showPercent={false} />
                <span className="text-xs text-fie-accent-blue bg-[rgba(59,130,246,0.1)] rounded px-2 py-0.5 mt-1 inline-block">
                  {pd.overUnder25.overOdds}
                </span>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-fie-accent-blue">Under 2.5</span>
                  <span className="text-xl font-bold font-mono text-fie-accent-blue font-tabular">
                    {pd.overUnder25.under}%
                  </span>
                </div>
                <ProbabilityBar label="" value={pd.overUnder25.under} color="blue" showPercent={false} />
                <span className="text-xs text-fie-accent-blue bg-[rgba(59,130,246,0.1)] rounded px-2 py-0.5 mt-1 inline-block">
                  {pd.overUnder25.underOdds}
                </span>
              </div>
            </div>
            <span className="inline-block mt-3 text-xs bg-[rgba(0,212,160,0.1)] text-fie-accent-teal rounded-full px-3 py-1">
              OVER 2.5 recommended
            </span>
          </GlassCard>

          <GlassCard>
            <h3 className="text-base font-semibold text-fie-text-primary mb-3">
              Total Goals — Over/Under 3.5
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-fie-accent-warning">Over 3.5</span>
                  <span className="text-xl font-bold font-mono text-fie-accent-warning font-tabular">
                    {pd.overUnder35.over}%
                  </span>
                </div>
                <ProbabilityBar label="" value={pd.overUnder35.over} color="warning" showPercent={false} />
                <span className="text-xs text-fie-accent-blue bg-[rgba(59,130,246,0.1)] rounded px-2 py-0.5 mt-1 inline-block">
                  {pd.overUnder35.overOdds}
                </span>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-fie-accent-blue">Under 3.5</span>
                  <span className="text-xl font-bold font-mono text-fie-accent-blue font-tabular">
                    {pd.overUnder35.under}%
                  </span>
                </div>
                <ProbabilityBar label="" value={pd.overUnder35.under} color="blue" showPercent={false} />
                <span className="text-xs text-fie-accent-blue bg-[rgba(59,130,246,0.1)] rounded px-2 py-0.5 mt-1 inline-block">
                  {pd.overUnder35.underOdds}
                </span>
              </div>
            </div>
            <span className="inline-block mt-3 text-xs bg-[rgba(59,130,246,0.1)] text-fie-accent-blue rounded-full px-3 py-1">
              UNDER 3.5 recommended
            </span>
          </GlassCard>
        </div>
      </motion.section>

      {/* ===== BTTS ===== */}
      <motion.section variants={itemVariants}>
        <GlassCard>
          <h3 className="text-base font-semibold text-fie-text-primary mb-3">
            Both Teams to Score
          </h3>
          <div className="flex h-12 rounded-xl overflow-hidden">
            <motion.div
              className="flex items-center justify-center bg-fie-accent-teal text-white font-bold text-base"
              initial={{ width: 0 }}
              animate={{ width: `${pd.btts.yes}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
            >
              YES {pd.btts.yes}%
            </motion.div>
            <motion.div
              className="flex items-center justify-center bg-fie-accent-danger text-white font-bold text-base"
              initial={{ width: 0 }}
              animate={{ width: `${pd.btts.no}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.5 }}
            >
              {pd.btts.no}% NO
            </motion.div>
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-xs text-fie-accent-teal">
              Yes: 1.61
            </span>
            <span className="text-xs text-fie-accent-warning bg-[rgba(255,176,32,0.1)] rounded px-2 py-0.5">
              Confidence: Medium
            </span>
            <span className="text-xs text-fie-accent-danger">
              No: 2.38
            </span>
          </div>
        </GlassCard>
      </motion.section>

      {/* ===== Corners + Cards ===== */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard>
            <h3 className="text-base font-semibold text-fie-text-primary mb-2">
              Corner Prediction
            </h3>
            <p className="text-3xl font-bold font-mono text-fie-text-primary font-tabular">
              {pd.corners.expected}
            </p>
            <p className="text-xs text-fie-text-muted mb-3">Expected total corners</p>
            <div className="space-y-2">
              <ProbabilityBar label={`Over ${pd.corners.expected}`} value={pd.corners.over} color="teal" />
              <ProbabilityBar label={`Under ${pd.corners.expected}`} value={pd.corners.under} color="blue" />
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-base font-semibold text-fie-text-primary mb-2">
              Card Prediction
            </h3>
            <p className="text-3xl font-bold font-mono text-fie-text-primary font-tabular">
              {pd.cards.expected}
            </p>
            <p className="text-xs text-fie-text-muted mb-3">Expected total cards</p>
            <div className="space-y-2">
              <ProbabilityBar label={`Over ${pd.cards.expected}`} value={pd.cards.over} color="warning" />
              <ProbabilityBar label={`Under ${pd.cards.expected}`} value={pd.cards.under} color="blue" />
            </div>
            <p className="text-xs text-fie-text-muted mt-2">
              Ref: M. Oliver (avg 3.2 cards/match)
            </p>
          </GlassCard>
        </div>
      </motion.section>

      {/* ===== Correct Score Grid ===== */}
      <motion.section variants={itemVariants}>
        <GlassCard>
          <h2 className="text-xl font-semibold text-fie-text-primary mb-1">
            Correct Score Prediction
          </h2>
          <p className="text-xs text-fie-text-muted mb-2">
            Highlighted scores are FIE&apos;s top predictions
          </p>
          <div className="flex gap-4 text-xs mb-3">
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm bg-[rgba(0,212,160,0.2)] border border-fie-accent-teal" /> Primary
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm border border-fie-accent-teal" /> Secondary
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm border border-[rgba(255,59,92,0.3)]" /> Avoid
            </span>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[480px]">
              {/* Header row */}
              <div className="grid grid-cols-7 gap-1 mb-1">
                <div className="text-center text-xs text-fie-text-muted" />
                {awayGoalsList.map((g) => (
                  <div key={g} className="text-center text-xs font-semibold text-fie-text-secondary">
                    {g >= 5 ? '5+' : g}
                  </div>
                ))}
              </div>
              {/* Grid rows */}
              {homeGoalsList.map((homeG, ri) => (
                <div key={homeG} className="grid grid-cols-7 gap-1 mb-1">
                  <div className="text-center text-xs font-semibold text-fie-text-secondary self-center">
                    {homeG}
                  </div>
                  {awayGoalsList.map((awayG, ci) => {
                    const cell = scoreGrid[ri]?.[ci];
                    const prob = cell?.prob ?? 0;
                    const highlight = cell?.highlight;
                    const isPrimary = highlight === 'primary';
                    const isSecondary = highlight === 'secondary';
                    const isAvoid = highlight === 'avoid';

                    return (
                      <motion.div
                        key={`${ri}-${ci}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: ri * 0.03 * 6 + ci * 0.03,
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1] as const,
                        }}
                        whileHover={{ y: -2 }}
                        className={`flex flex-col items-center justify-center rounded-lg border p-2 h-14 cursor-pointer transition-all ${
                          isPrimary
                            ? 'bg-[rgba(0,212,160,0.2)] border-2 border-fie-accent-teal text-fie-accent-teal shadow-[0_0_12px_rgba(0,212,160,0.15)]'
                            : isSecondary
                            ? 'border border-fie-accent-teal text-fie-text-secondary'
                            : isAvoid
                            ? 'border border-[rgba(255,59,92,0.3)] text-fie-text-dim'
                            : 'border border-fie-border-primary text-fie-text-muted'
                        }`}
                      >
                        <span className="text-xs font-semibold font-mono">
                          {homeG}-{awayG >= 5 ? '5+' : awayG}
                        </span>
                        <span className="text-[10px]">{prob}%</span>
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.section>

      {/* ===== Recommendations ===== */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold text-fie-text-primary mb-1">
          FIE Recommendations
        </h2>
        <p className="text-xs text-fie-accent-purple mb-4">
          Based on 10-Agent roundtable consensus
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Safe */}
          <GlassCard variant="default" className="border-2 border-fie-accent-success !shadow-[0_0_16px_rgba(0,230,118,0.08)]">
            <span className="text-xs font-semibold bg-[rgba(0,230,118,0.15)] text-fie-accent-success rounded-md px-2 py-0.5">
              SAFE
            </span>
            <p className="mt-3 text-base font-semibold text-fie-text-primary">
              Man City Win + Over 2.5
            </p>
            <p className="text-2xl font-bold text-fie-accent-success font-tabular mt-2">72%</p>
            <span className="inline-block mt-1 text-xs text-fie-accent-blue bg-[rgba(59,130,246,0.1)] rounded px-2 py-0.5">
              1.85
            </span>
            <p className="mt-3 text-sm text-fie-text-secondary leading-relaxed">
              Strong home form (WWLWW) combined with title race motivation (Class A).
              Historical H2H favors City at Etihad. Over 2.5 likely given both teams&apos; attacking records.
            </p>
            <p className="mt-2 text-xs text-fie-accent-teal">
              Low risk — Both teams at full strength
            </p>
          </GlassCard>

          {/* Medium */}
          <GlassCard variant="warning" className="!shadow-[0_0_16px_rgba(255,176,32,0.08)]">
            <span className="text-xs font-semibold bg-[rgba(255,176,32,0.15)] text-fie-accent-warning rounded-md px-2 py-0.5">
              MEDIUM
            </span>
            <p className="mt-3 text-base font-semibold text-fie-text-primary">
              Correct Score: 2-1
            </p>
            <p className="text-2xl font-bold text-fie-accent-warning font-tabular mt-2">12%</p>
            <span className="inline-block mt-1 text-xs text-fie-accent-blue bg-[rgba(59,130,246,0.1)] rounded px-2 py-0.5">
              8.50
            </span>
            <p className="mt-3 text-sm text-fie-text-secondary leading-relaxed">
              Most likely scoreline based on expected goals model. City average 2.1 goals at home,
              Liverpool concede 1.2 away.
            </p>
            <p className="mt-2 text-xs text-fie-accent-warning">
              Medium — Scorelines are inherently variable
            </p>
          </GlassCard>

          {/* High Risk */}
          <GlassCard variant="danger" className="!shadow-[0_0_16px_rgba(255,59,92,0.08)]">
            <span className="text-xs font-semibold bg-[rgba(255,59,92,0.15)] text-fie-accent-danger rounded-md px-2 py-0.5">
              HIGH RISK
            </span>
            <p className="mt-3 text-base font-semibold text-fie-text-primary">
              Half-Time/Full-Time: Draw/City
            </p>
            <p className="text-2xl font-bold text-fie-accent-danger font-tabular mt-2">8%</p>
            <span className="inline-block mt-1 text-xs text-fie-accent-blue bg-[rgba(59,130,246,0.1)] rounded px-2 py-0.5">
              4.75
            </span>
            <p className="mt-3 text-sm text-fie-text-secondary leading-relaxed">
              Liverpool strong first half away, City tends to break through in second half.
              Historical pattern shows 3 of last 5 H2H followed this script.
            </p>
            <p className="mt-2 text-xs text-fie-accent-danger">
              High — HT/FT markets volatile
            </p>
          </GlassCard>
        </div>
      </motion.section>

      {/* ===== Risk Warning ===== */}
      <motion.section variants={itemVariants}>
        <GlassCard variant="warning" className="bg-[rgba(255,176,32,0.05)]">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-fie-accent-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-semibold text-fie-accent-warning">
                Risk Warning
              </h3>
              <p className="mt-2 text-sm text-fie-text-secondary leading-relaxed">
                Key risk factors for this match:
              </p>
              <ol className="mt-2 space-y-1.5 text-sm text-fie-text-secondary list-decimal list-inside">
                <li>Liverpool on a 3-match away winning streak — momentum factor may override historical H2H</li>
                <li>Potential rain forecast — could suppress goal count below model predictions</li>
                <li>Man City midfield injury concern (De Bruyne) — creative output may be reduced</li>
                <li>Title race pressure — both teams may play conservatively in first half</li>
              </ol>
              <p className="mt-3 text-xs text-fie-text-muted italic">
                Always manage bankroll responsibly. Past performance does not guarantee future results.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.section>
    </motion.div>
  );
}
