import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Shuffle,
  FileText,
  CheckCircle,
  Zap,
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { agents, roundtableReport, agentWeights } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const phases = [
  {
    icon: Users,
    label: 'Parallel Analysis',
    desc: '10 agents analyze independently',
    status: 'complete',
  },
  {
    icon: Shuffle,
    label: 'Cross-Validation',
    desc: 'Agents review & challenge each other',
    status: 'complete',
  },
  {
    icon: FileText,
    label: 'Report Generation',
    desc: 'Synthesize final consensus report',
    status: 'complete',
  },
];

export default function Roundtable() {
  const [selectedAgent, setSelectedAgent] = useState(0);

  const selected = agents[selectedAgent];

  // Pre-compute agent positions in a circle
  const agentPositions = useMemo(() => {
    const radius = 160;
    return agents.slice(0, 9).map((_, i) => {
      const angle = (i * 2 * Math.PI) / 9 - Math.PI / 2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    });
  }, []);

  // Parse the markdown report to sections
  const reportSections = useMemo(() => {
    const lines = roundtableReport.split('\n').filter((l) => l.trim());
    const sections: { type: string; content: string }[] = [];
    let currentTable: string[] = [];
    let inTable = false;

    for (const line of lines) {
      if (line.startsWith('# ')) {
        if (inTable && currentTable.length > 0) {
          sections.push({ type: 'table', content: currentTable.join('\n') });
          currentTable = [];
          inTable = false;
        }
        sections.push({ type: 'h1', content: line.replace('# ', '') });
      } else if (line.startsWith('## ')) {
        if (inTable && currentTable.length > 0) {
          sections.push({ type: 'table', content: currentTable.join('\n') });
          currentTable = [];
          inTable = false;
        }
        sections.push({ type: 'h2', content: line.replace('## ', '') });
      } else if (line.startsWith('### ')) {
        if (inTable && currentTable.length > 0) {
          sections.push({ type: 'table', content: currentTable.join('\n') });
          currentTable = [];
          inTable = false;
        }
        sections.push({ type: 'h3', content: line.replace('### ', '') });
      } else if (line.startsWith('|')) {
        inTable = true;
        currentTable.push(line);
      } else if (line.startsWith('- ')) {
        if (inTable && currentTable.length > 0) {
          sections.push({ type: 'table', content: currentTable.join('\n') });
          currentTable = [];
          inTable = false;
        }
        sections.push({ type: 'bullet', content: line.replace('- ', '') });
      } else if (line.startsWith('**') && line.endsWith('**')) {
        sections.push({ type: 'bold', content: line.replace(/\*\*/g, '') });
      } else if (line.trim()) {
        if (inTable && currentTable.length > 0) {
          sections.push({ type: 'table', content: currentTable.join('\n') });
          currentTable = [];
          inTable = false;
        }
        sections.push({ type: 'para', content: line });
      }
    }
    if (inTable && currentTable.length > 0) {
      sections.push({ type: 'table', content: currentTable.join('\n') });
    }
    return sections;
  }, []);

  // Parse bullet with bold markers
  function parseBullet(content: string) {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-fie-text-primary">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.section variants={itemVariants}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gradient-accent">
              Multi-Agent Roundtable
            </h1>
            <p className="text-sm text-fie-text-muted mt-2">
              10 AI Agents analyze in parallel → cross-validate → synthesize final report
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-fie-text-secondary bg-fie-bg-secondary border border-fie-border-primary rounded-lg px-3 py-2">
              Man City vs Liverpool — Today 20:00
            </span>
            <span className="flex items-center gap-1.5 text-xs bg-[rgba(0,230,118,0.1)] text-fie-accent-success rounded-full px-2.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-fie-accent-success animate-pulse" />
              Analysis Complete
            </span>
          </div>
        </div>
      </motion.section>

      {/* 3D-style Agent Visualization */}
      <motion.section variants={itemVariants}>
        <GlassCard className="!p-0 overflow-hidden">
          <div className="relative h-[500px] md:h-[600px] bg-fie-bg-primary flex items-center justify-center"
            style={{
              backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,160,0.04) 0%, transparent 60%)',
            }}
          >
            {/* Particle background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: i % 2 === 0 ? '#00D4A0' : '#8B5CF6',
                    opacity: 0.2,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>

            {/* Center Hub */}
            <motion.div
              className="absolute z-20 flex flex-col items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <motion.div
                className="w-16 h-16 rounded-full border-2 border-fie-accent-teal flex items-center justify-center"
                style={{
                  background: 'rgba(0, 212, 160, 0.1)',
                  boxShadow: '0 0 30px rgba(0, 212, 160, 0.3)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="h-8 w-8 text-fie-accent-teal" />
              </motion.div>
              <span className="mt-2 text-[11px] text-fie-accent-teal font-medium">FIE Engine</span>
            </motion.div>

            {/* Orbiting ring */}
            <motion.div
              className="absolute rounded-full border border-fie-border-primary"
              style={{
                width: 360,
                height: 360,
                opacity: 0.2,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />

            {/* Agent Nodes */}
            {agents.slice(0, 9).map((agent, i) => {
              const pos = agentPositions[i];
              const isSelected = selectedAgent === i;
              return (
                <motion.button
                  key={agent.id}
                  className="absolute z-10 flex flex-col items-center cursor-pointer"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isSelected ? 1.3 : 1,
                    opacity: 1,
                  }}
                  transition={{
                    scale: { duration: 0.3 },
                    opacity: { delay: 0.4 + i * 0.2, duration: 0.4 },
                  }}
                  onClick={() => setSelectedAgent(i)}
                >
                  {/* Connection line to center */}
                  <svg
                    className="absolute pointer-events-none"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotate(${Math.atan2(-pos.y, -pos.x) * (180 / Math.PI)}deg)`,
                      width: Math.sqrt(pos.x * pos.x + pos.y * pos.y) + 30,
                      height: 2,
                      overflow: 'visible',
                    }}
                  >
                    <line
                      x1="0"
                      y1="1"
                      x2={Math.sqrt(pos.x * pos.x + pos.y * pos.y) + 30}
                      y2="1"
                      stroke={isSelected ? agent.color : '#1E2940'}
                      strokeWidth={isSelected ? 2 : 1}
                      strokeDasharray={isSelected ? 'none' : '4 4'}
                      opacity={isSelected ? 0.8 : 0.3}
                    />
                  </svg>

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                    style={{
                      backgroundColor: `${agent.color}20`,
                      borderColor: isSelected ? agent.color : `${agent.color}40`,
                      boxShadow: isSelected ? `0 0 20px ${agent.color}40` : 'none',
                    }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: agent.color }}
                    >
                      {agent.name[0]}
                    </span>
                  </div>
                  <span
                    className="mt-1.5 text-[10px] font-medium whitespace-nowrap"
                    style={{ color: isSelected ? agent.color : '#94A3B8' }}
                  >
                    {agent.name}
                  </span>
                </motion.button>
              );
            })}

            {/* Phase indicator ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 380,
                height: 380,
                border: '1px dashed rgba(139, 92, 246, 0.2)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </GlassCard>
      </motion.section>

      {/* Phase Indicator Bar */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between">
          {phases.map((phase, i) => (
            <div key={phase.label} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(0,230,118,0.1)]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.2, type: 'spring' }}
                  >
                    <CheckCircle className="h-5 w-5 text-fie-accent-success" />
                  </motion.div>
                  <span className="mt-2 text-sm font-semibold text-fie-text-primary text-center">
                    {phase.label}
                  </span>
                  <span className="text-xs text-fie-text-muted text-center">
                    {phase.desc}
                  </span>
                </div>
                {i < phases.length - 1 && (
                  <motion.div
                    className="flex-1 h-0.5 bg-fie-border-primary mx-4 mb-6"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8 + i * 0.2, duration: 0.8 }}
                    style={{ transformOrigin: 'left' }}
                  >
                    <div className="h-full bg-fie-accent-success" style={{ width: '100%' }} />
                  </motion.div>
                )}
              </div>
            ))}
        </div>
      </motion.section>

      {/* Agent Status Panel */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Agent List */}
          <div className="lg:col-span-2">
            <GlassCard className="h-full !p-3">
              <h3 className="text-sm font-semibold text-fie-text-primary mb-3 px-2">
                Agent Panel
              </h3>
              <div className="space-y-1">
                {agents.map((agent, i) => (
                  <motion.button
                    key={agent.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    onClick={() => setSelectedAgent(i)}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                      selectedAgent === i
                        ? 'bg-[rgba(255,255,255,0.03)] border-l-[3px]'
                        : 'hover:bg-[rgba(255,255,255,0.02)] border-l-[3px] border-l-transparent'
                    }`}
                    style={{
                      borderLeftColor: selectedAgent === i ? agent.color : 'transparent',
                    }}
                  >
                    <span
                      className="h-3 w-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: agent.color }}
                    />
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-sm font-medium text-fie-text-primary truncate">
                        {agent.name}
                      </p>
                      <p className="text-[11px] text-fie-text-muted truncate">{agent.role}</p>
                    </div>
                    <CheckCircle className="h-4 w-4 text-fie-accent-success flex-shrink-0" />
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Agent Detail */}
          <div className="lg:col-span-3">
            <GlassCard
              key={selected.id}
              className="h-full"
              style={{ borderColor: `${selected.color}30` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${selected.color}20` }}
                >
                  <span className="text-lg font-bold" style={{ color: selected.color }}>
                    {selected.name[0]}
                  </span>
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: selected.color }}
                  >
                    {selected.name} Agent
                  </h3>
                  <p className="text-xs text-fie-text-muted">{selected.role}</p>
                </div>
              </div>

              <div className="text-sm text-fie-text-secondary leading-relaxed space-y-3">
                {selected.analysis.split('\n\n').map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>

              <div
                className="mt-4 rounded-lg p-3 border-l-[3px]"
                style={{
                  backgroundColor: `${selected.color}08`,
                  borderLeftColor: selected.color,
                }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: selected.color }}>
                  Key Finding
                </p>
                <p className="text-sm text-fie-text-secondary">{selected.keyFinding}</p>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-fie-text-muted">Confidence</span>
                  <span
                    className="text-sm font-mono font-bold font-tabular"
                    style={{ color: selected.color }}
                  >
                    {selected.confidence}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-fie-bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: selected.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${selected.confidence}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.section>

      {/* Final Consensus Report */}
      <motion.section variants={itemVariants}>
        <GlassCard variant="accent">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-fie-accent-teal">
              Final Consensus Report
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-[rgba(0,230,118,0.1)] text-fie-accent-success rounded-full px-2.5 py-1">
                10/10 Agents Agreed
              </span>
              <span className="text-xs text-fie-text-muted">
                Generated: 2025-03-31 19:45:00
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {reportSections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                {section.type === 'h1' && (
                  <h1 className="text-xl font-bold text-fie-accent-teal border-b border-fie-border-primary pb-2 mt-6">
                    {section.content}
                  </h1>
                )}
                {section.type === 'h2' && (
                  <h2 className="text-base font-semibold text-fie-text-primary mt-4">
                    {section.content}
                  </h2>
                )}
                {section.type === 'h3' && (
                  <h3 className="text-sm font-semibold text-fie-text-secondary mt-3">
                    {section.content}
                  </h3>
                )}
                {section.type === 'para' && (
                  <p className="text-sm text-fie-text-secondary leading-relaxed">
                    {parseBullet(section.content)}
                  </p>
                )}
                {section.type === 'bold' && (
                  <p className="text-sm font-semibold text-fie-text-primary my-2">
                    {section.content}
                  </p>
                )}
                {section.type === 'bullet' && (
                  <div className="flex items-start gap-2 py-1">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-fie-accent-teal flex-shrink-0" />
                    <p className="text-sm text-fie-text-secondary">
                      {parseBullet(section.content)}
                    </p>
                  </div>
                )}
                {section.type === 'table' && (
                  <div className="mt-3 overflow-x-auto">
                    <TableRenderer content={section.content} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.section>

      {/* Agent Contribution Breakdown */}
      <motion.section variants={itemVariants}>
        <GlassCard>
          <h3 className="text-base font-semibold text-fie-text-primary mb-1">
            Agent Contribution Weights
          </h3>
          <p className="text-xs text-fie-text-muted mb-4">
            How much each agent influenced the final consensus
          </p>

          {/* Stacked Bar */}
          <div className="h-8 rounded-lg overflow-hidden flex">
            {agentWeights.map((aw, i) => (
              <motion.div
                key={aw.name}
                className="h-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ backgroundColor: aw.color }}
                initial={{ width: 0 }}
                animate={{ width: `${aw.weight}%` }}
                transition={{
                  delay: i * 0.15,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                {aw.weight >= 8 ? `${aw.weight}%` : ''}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4">
            {agentWeights.map((aw) => (
              <div key={aw.name} className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: aw.color }}
                />
                <span className="text-xs text-fie-text-secondary">
                  {aw.name} ({aw.weight}%)
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.section>
    </motion.div>
  );
}

function TableRenderer({ content }: { content: string }) {
  const table = parseTableHelper(content);
  if (!table) return null;
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-[rgba(0,212,160,0.05)]">
          {table.headers.map((h, i) => (
            <th key={i} className="text-left px-3 py-2 text-xs font-semibold text-fie-accent-teal border border-fie-border-primary">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, ri) => (
          <tr key={ri}>
            {row.map((cell, ci) => (
              <td key={ci} className="px-3 py-2 text-fie-text-secondary border border-fie-border-primary">
                {parseTableCell(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function parseTableHelper(content: string) {
  const lines = content.split('\n').filter((l) => l.trim() && !l.match(/^|[-:\|\s]+|$/));
  if (lines.length === 0) return null;
  const headers = lines[0]
    .split('|')
    .filter((c) => c.trim())
    .map((c) => c.trim());
  const rows = lines.slice(1).map((line) =>
    line
      .split('|')
      .filter((c) => c.trim())
      .map((c) => c.trim())
  );
  return { headers, rows };
}

function parseTableCell(cell: string) {
  const parts = cell.split(/(\*\*.*?\*\*)/g);
  if (parts.length === 1) return cell;
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-fie-text-primary">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}
