// ===== Types =====
export interface Match {
  id: string;
  league: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  homeScore?: number;
  awayScore?: number;
  status: 'live' | 'upcoming' | 'finished';
  odds: { home: number; draw: number; away: number };
  liveMinute?: number;
}

export interface Prediction {
  wdl: { home: number; draw: number; away: number };
  scoreGrid: { home: number; away: number; prob: number; highlight?: 'primary' | 'secondary' | 'avoid' }[][];
  overUnder25: { over: number; under: number; overOdds: number; underOdds: number };
  overUnder35: { over: number; under: number; overOdds: number; underOdds: number };
  btts: { yes: number; no: number };
  corners: { expected: number; over: number; under: number };
  cards: { expected: number; over: number; under: number };
}

export interface LiveStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  cards: { home: number; away: number };
}

export interface TimelineEvent {
  minute: string;
  type: 'goal' | 'yellow' | 'red' | 'substitution' | 'halftime';
  description: string;
  team: 'home' | 'away' | 'neutral';
}

export interface Agent {
  id: number;
  name: string;
  role: string;
  color: string;
  confidence: number;
  conclusion: string;
  analysis: string;
  keyFinding: string;
}

export interface BetSlip {
  id: string;
  match: string;
  homeFlag: string;
  awayFlag: string;
  pick: string;
  pickType: string;
  odds: number;
  stake: number;
  estReturn: number;
  status: 'alive' | 'risky' | 'dead' | 'won';
  currentScore: string;
  label: string;
  liveMinute?: number;
  isFinished?: boolean;
}

export interface ReviewData {
  predictions: { label: string; predicted: string }[];
  results: { label: string; actual: string; hit: boolean }[];
  radarScores: { dimension: string; score: number }[];
  hits: { name: string; predicted: string; actual: string }[];
  misses: { name: string; predicted: string; actual: string; deviation: string }[];
  newRules: { title: string; description: string; confidence: string }[];
}

// ===== Matches =====
export const matches: Match[] = [
  {
    id: '1',
    league: 'La Liga',
    time: '19:30',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeFlag: '🇪🇸',
    awayFlag: '🇪🇸',
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    odds: { home: 2.1, draw: 3.4, away: 3.2 },
    liveMinute: 67,
  },
  {
    id: '2',
    league: 'Premier League',
    time: '20:00',
    homeTeam: 'Man City',
    awayTeam: 'Liverpool',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    status: 'upcoming',
    odds: { home: 1.92, draw: 4.17, away: 4.17 },
  },
  {
    id: '3',
    league: 'Bundesliga',
    time: '20:00',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Dortmund',
    homeFlag: '🇩🇪',
    awayFlag: '🇩🇪',
    status: 'upcoming',
    odds: { home: 1.65, draw: 4.2, away: 4.8 },
  },
  {
    id: '4',
    league: 'Serie A',
    time: '20:30',
    homeTeam: 'Juventus',
    awayTeam: 'Inter Milan',
    homeFlag: '🇮🇹',
    awayFlag: '🇮🇹',
    status: 'upcoming',
    odds: { home: 2.8, draw: 3.2, away: 2.6 },
  },
  {
    id: '5',
    league: 'Ligue 1',
    time: '21:00',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    homeFlag: '🇫🇷',
    awayFlag: '🇫🇷',
    status: 'upcoming',
    odds: { home: 1.55, draw: 4.5, away: 5.5 },
  },
  {
    id: '6',
    league: 'Eredivisie',
    time: '21:00',
    homeTeam: 'Ajax',
    awayTeam: 'PSV',
    homeFlag: '🇳🇱',
    awayFlag: '🇳🇱',
    status: 'upcoming',
    odds: { home: 2.3, draw: 3.5, away: 2.9 },
  },
  {
    id: '7',
    league: 'Primeira Liga',
    time: '21:45',
    homeTeam: 'Benfica',
    awayTeam: 'Porto',
    homeFlag: '🇵🇹',
    awayFlag: '🇵🇹',
    status: 'upcoming',
    odds: { home: 2.4, draw: 3.3, away: 2.8 },
  },
  {
    id: '8',
    league: 'Brasileirão',
    time: '22:00',
    homeTeam: 'Flamengo',
    awayTeam: 'Palmeiras',
    homeFlag: '🇧🇷',
    awayFlag: '🇧🇷',
    status: 'upcoming',
    odds: { home: 2.2, draw: 3.3, away: 3.2 },
  },
];

// ===== Featured Match =====
export const featuredMatch = matches[0];

// ===== Prediction Data (PreMatch) =====
export const predictionData: Prediction = {
  wdl: { home: 52, draw: 24, away: 24 },
  scoreGrid: [
    [
      { home: 0, away: 0, prob: 4 },
      { home: 0, away: 1, prob: 6 },
      { home: 0, away: 2, prob: 5 },
      { home: 0, away: 3, prob: 2 },
      { home: 0, away: 4, prob: 1 },
      { home: 0, away: 5, prob: 0 },
    ],
    [
      { home: 1, away: 0, prob: 5 },
      { home: 1, away: 1, prob: 8, highlight: 'secondary' },
      { home: 1, away: 2, prob: 10 },
      { home: 1, away: 3, prob: 4 },
      { home: 1, away: 4, prob: 1 },
      { home: 1, away: 5, prob: 0 },
    ],
    [
      { home: 2, away: 0, prob: 3 },
      { home: 2, away: 1, prob: 12, highlight: 'primary' },
      { home: 2, away: 2, prob: 9 },
      { home: 2, away: 3, prob: 3 },
      { home: 2, away: 4, prob: 1 },
      { home: 2, away: 5, prob: 0 },
    ],
    [
      { home: 3, away: 0, prob: 2 },
      { home: 3, away: 1, prob: 6 },
      { home: 3, away: 2, prob: 5 },
      { home: 3, away: 3, prob: 2 },
      { home: 3, away: 4, prob: 0 },
      { home: 3, away: 5, prob: 0 },
    ],
  ],
  overUnder25: { over: 62, under: 38, overOdds: 1.61, underOdds: 2.63 },
  overUnder35: { over: 38, under: 62, overOdds: 2.63, underOdds: 1.61 },
  btts: { yes: 62, no: 38 },
  corners: { expected: 9.5, over: 58, under: 42 },
  cards: { expected: 3.5, over: 45, under: 55 },
};

// ===== Live Stats =====
export const liveStats: LiveStats = {
  possession: { home: 54, away: 46 },
  shots: { home: 12, away: 8 },
  shotsOnTarget: { home: 5, away: 3 },
  corners: { home: 6, away: 4 },
  fouls: { home: 8, away: 11 },
  cards: { home: 1, away: 2 },
};

// ===== Timeline Events =====
export const timelineEvents: TimelineEvent[] = [
  { minute: "67'", type: 'yellow', description: 'Yellow Card — Van Dijk', team: 'away' },
  { minute: "64'", type: 'substitution', description: 'Substitution — Grealish → Foden', team: 'home' },
  { minute: "58'", type: 'goal', description: 'Goal — Haaland (assist: De Bruyne)', team: 'home' },
  { minute: "52'", type: 'goal', description: 'Goal — Salah (penalty)', team: 'away' },
  { minute: "45+2'", type: 'yellow', description: 'Yellow Card — Dias', team: 'home' },
  { minute: "45'", type: 'halftime', description: 'Halftime', team: 'neutral' },
  { minute: "31'", type: 'goal', description: 'Goal — Haaland', team: 'home' },
  { minute: "12'", type: 'yellow', description: 'Yellow Card — Alexander-Arnold', team: 'away' },
];

// ===== Agents =====
export const agents: Agent[] = [
  {
    id: 1,
    name: 'Tactical',
    role: 'Formation & tactics analysis',
    color: '#00D4A0',
    confidence: 82,
    conclusion: 'Home advantage from 4-3-3 formation vs 4-2-3-1',
    analysis: "Man City is expected to deploy a 4-3-3 formation with Haaland as the central striker. Liverpool will likely counter with a 4-2-3-1, using Salah on the right wing to exploit City's left defensive channel. Key tactical insight: City's high press has been 23% more effective at home this season. Liverpool's build-up play under pressure ranks 4th in the league, suggesting potential turnovers in dangerous areas.",
    keyFinding: "City's high press effectiveness at home creates turnover opportunities.",
  },
  {
    id: 2,
    name: 'Historical',
    role: 'H2H & historical patterns',
    color: '#3B82F6',
    confidence: 78,
    conclusion: 'Strong home H2H advantage for Man City',
    analysis: "Historical head-to-head analysis shows a significant home advantage pattern. Over the last 10 meetings, the home team has won 6 times, with 3 draws and only 1 away win. Man City specifically has won their last 4 home games against Liverpool across all competitions.",
    keyFinding: 'Home team won 6 of last 10 H2H meetings.',
  },
  {
    id: 3,
    name: 'Form',
    role: 'Recent form & momentum',
    color: '#00E676',
    confidence: 85,
    conclusion: 'Man City superior home form vs Liverpool away form',
    analysis: "Recent form analysis reveals contrasting trajectories. Man City have won 4 of their last 5 home games (WWLWW), scoring an average of 2.4 goals per game while conceding only 0.8.",
    keyFinding: "City's home form (4W in 5) significantly stronger.",
  },
  {
    id: 4,
    name: 'Motivation',
    role: 'Stakes & motivation analysis',
    color: '#8B5CF6',
    confidence: 90,
    conclusion: 'Class A motivation for both sides',
    analysis: "Both teams exhibit Class A motivation levels. Man City are in a title race where every point matters. Liverpool are fighting for Champions League qualification.",
    keyFinding: 'Both teams at peak motivation.',
  },
  {
    id: 5,
    name: 'Stats',
    role: 'xG & advanced statistics',
    color: '#06B6D4',
    confidence: 76,
    conclusion: 'xG models predict 2.1-1.2 in favor of City',
    analysis: "Advanced statistical models paint a clear picture. Man City's expected goals (xG) at home this season averages 2.1 per game.",
    keyFinding: 'xG models strongly favor City.',
  },
  {
    id: 6,
    name: 'Market',
    role: 'Odds & market movement',
    color: '#F97316',
    confidence: 72,
    conclusion: 'Market odds align with model predictions',
    analysis: "Market analysis shows the odds have moved in favor of Man City, opening at 2.05 and shortening to 1.92.",
    keyFinding: 'Odds movement favors City (2.05 -> 1.92).',
  },
  {
    id: 7,
    name: 'Weather',
    role: 'Conditions impact',
    color: '#64748B',
    confidence: 65,
    conclusion: 'Overcast conditions, minimal impact',
    analysis: 'Weather forecast indicates overcast conditions with temperatures around 14°C and light winds.',
    keyFinding: 'Neutral weather conditions expected.',
  },
  {
    id: 8,
    name: 'Referee',
    role: 'Official impact analysis',
    color: '#EAB308',
    confidence: 68,
    conclusion: 'M. Oliver averages 3.2 cards/match',
    analysis: 'Referee Michael Oliver has officiated 24 Premier League matches this season, averaging 3.2 yellow cards per game.',
    keyFinding: 'Oliver averages 3.2 cards/match.',
  },
  {
    id: 9,
    name: 'Injury',
    role: 'Squad & injury analysis',
    color: '#EF4444',
    confidence: 70,
    conclusion: 'De Bruyne fitness is a minor concern',
    analysis: 'Squad analysis reveals Man City have minor concerns around De Bruyne who is rated 75% fit to start.',
    keyFinding: 'De Bruyne 75% fit.',
  },
  {
    id: 10,
    name: 'Consensus',
    role: 'Final synthesis & report',
    color: '#F59E0B',
    confidence: 88,
    conclusion: 'Strong consensus for home win with over 2.5 goals',
    analysis: 'Synthesizing all agent analyses, there is strong consensus (88% confidence) that Man City will win this match.',
    keyFinding: '88% consensus confidence in home win.',
  },
];

// ===== Bet Slips =====
export const betSlips: BetSlip[] = [
  {
    id: '1',
    match: 'Man City vs Liverpool',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    pick: 'Man City Win',
    pickType: '1X2',
    odds: 1.92,
    stake: 10.0,
    estReturn: 9.2,
    status: 'alive',
    currentScore: '2-1 (City lead)',
    label: '✓ On Track',
    liveMinute: 67,
  },
  {
    id: '2',
    match: 'Man City vs Liverpool',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    pick: 'Over 2.5',
    pickType: 'Over/Under',
    odds: 1.61,
    stake: 15.0,
    estReturn: 9.15,
    status: 'alive',
    currentScore: '2-1 = 3 goals',
    label: '✓ Hit',
    liveMinute: 67,
  },
  {
    id: '3',
    match: 'Man City vs Liverpool',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    pick: 'Correct Score 2-1',
    pickType: 'Correct Score',
    odds: 8.50,
    stake: 5.0,
    estReturn: 37.5,
    status: 'risky',
    currentScore: '2-1 now, 23 min left',
    label: '⚠ Hanging',
    liveMinute: 67,
  },
  {
    id: '4',
    match: 'Bayern vs Dortmund',
    homeFlag: '🇩🇪',
    awayFlag: '🇩🇪',
    pick: 'Bayern Win',
    pickType: '1X2',
    odds: 1.75,
    stake: 10.0,
    estReturn: -10.0,
    status: 'dead',
    currentScore: '1-2 (Bayern losing)',
    label: '✗ Lost',
    isFinished: true,
  },
  {
    id: '5',
    match: 'PSG vs Marseille',
    homeFlag: '🇫🇷',
    awayFlag: '🇫🇷',
    pick: 'Over 3.5',
    pickType: 'Over/Under',
    odds: 2.10,
    stake: 8.0,
    estReturn: 8.8,
    status: 'alive',
    currentScore: '3-1 = 4 goals',
    label: '✓ Hit',
    isFinished: true,
  },
  {
    id: '6',
    match: 'Juventus vs Inter',
    homeFlag: '🇮🇹',
    awayFlag: '🇮🇹',
    pick: 'Draw',
    pickType: '1X2',
    odds: 3.40,
    stake: 5.0,
    estReturn: 12.0,
    status: 'risky',
    currentScore: '1-1, 15 min left',
    label: '⚠ Uncertain',
    liveMinute: 75,
  },
];

// ===== Review Data =====
export const reviewData: ReviewData = {
  predictions: [
    { label: 'Direction', predicted: 'Home Win (52%)' },
    { label: 'Correct Score', predicted: '2-1 (12%)' },
    { label: 'Over/Under 2.5', predicted: 'Over (62%)' },
    { label: 'Both Teams Score', predicted: 'Yes (62%)' },
    { label: 'Total Corners', predicted: '9.5' },
    { label: 'Total Cards', predicted: '3.5' },
  ],
  results: [
    { label: 'Direction', actual: 'Home Win', hit: true },
    { label: 'Correct Score', actual: '2-1', hit: true },
    { label: 'Total Goals', actual: '3', hit: true },
    { label: 'Both Teams Score', actual: 'Yes (2-1)', hit: true },
    { label: 'Total Corners', actual: '10', hit: false },
    { label: 'Total Cards', actual: '3', hit: true },
  ],
  radarScores: [
    { dimension: 'Direction', score: 100 },
    { dimension: 'Correct Score', score: 95 },
    { dimension: 'Corners', score: 78 },
    { dimension: 'Cards', score: 85 },
    { dimension: 'Live', score: 88 },
    { dimension: 'Overall', score: 92 },
  ],
  hits: [
    { name: 'Direction', predicted: 'Home Win', actual: 'Home Win' },
    { name: 'Correct Score', predicted: '2-1', actual: '2-1' },
    { name: 'Over/Under 2.5', predicted: 'Over', actual: '3 goals' },
    { name: 'Both Teams Score', predicted: 'Yes', actual: 'Yes' },
    { name: 'Total Cards', predicted: 'Under 3.5', actual: '3 cards' },
  ],
  misses: [
    { name: 'Total Corners', predicted: '9.5', actual: '10', deviation: 'Off by 0.5 (+5%)' },
  ],
  newRules: [
    {
      title: 'Title Race Motivation Amplifier',
      description: "When both teams have Class A motivation in title race scenarios, home team advantage increases by ~8% beyond baseline model.",
      confidence: 'High',
    },
    {
      title: 'Halftime Score Pattern',
      description: "Matches where home team leads 1-0 at HT in high-motivation games have a 72% probability of ending as home wins.",
      confidence: 'Medium',
    },
    {
      title: 'Corner Late-Game Surge',
      description: "When trailing team has Class A motivation and is within 1 goal with 15+ min remaining, expect +1.5 corners above baseline.",
      confidence: 'Medium',
    },
  ],
};

// ===== Roundtable Report (Chinese) =====
export const roundtableReport = `
# 曼城 vs 利物浦 — 赛前综合分析报告

## 一、比赛基本信息
- **赛事**：英超联赛 第31轮
- **时间**：2025年3月31日 20:00
- **场地**：伊蒂哈德球场（曼城主场）

## 二、FIE综合预测结论
**主推预测：曼城主胜（概率52%）**
**最可能比分：2-1（概率12%）**
**大小球推荐：大于2.5球（概率62%）**
**双方进球：是（概率62%）**

## 三、各维度分析摘要

### 1. 战术分析（Tactical Agent）
曼城预计沿用4-3-3阵型，哈兰德领衔锋线。利物浦可能以4-2-3-1应对，萨拉赫右翼突破。
关键发现：曼城主场高压逼抢效率比客场高23%。

### 2. 历史对战（Historical Agent）
近10次交锋：曼城5胜3平2负。伊蒂哈德球场近5次对阵利物浦：曼城4胜1平。

### 3. 近期状态（Form Agent）
曼城近5场：WWLWW（场均进球2.2，失球0.8）
利物浦近5场：WWWWL（场均进球1.8，失球1.0）

### 4. 战意分析（Motivation Agent）
曼城战意等级：A（争冠关键战）
利物浦战意等级：B（争四压力）

### 5. 统计数据（Stats Agent）
曼城预期进球(xG)：2.1
利物浦预期进球(xG)：1.2

### 6. 市场数据（Market Agent）
主流赔率：主胜1.92 / 平局4.17 / 客胜4.17

## 四、风险提示
1. 利物浦客场3连胜势头可能打破历史规律
2. 雨天预报可能抑制进球数
3. 德布劳内伤病隐患影响曼城创造力

## 五、最终推荐
| 推荐类型 | 推荐内容 | 信心指数 | 赔率 |
|---------|---------|---------|------|
| 安全推荐 | 曼城主胜 + 大于2.5球 | 72% | 1.85 |
| 中等风险 | 正确比分 2-1 | 12% | 8.50 |
| 高风险 | 半全场 平/主胜 | 8% | 4.75 |
`;

// ===== Chart Data =====
export const accuracyTrendData = [
  { month: 'Oct', direction: 62, correctScore: 18, overUnder: 58 },
  { month: 'Nov', direction: 64, correctScore: 20, overUnder: 60 },
  { month: 'Dec', direction: 61, correctScore: 22, overUnder: 56 },
  { month: 'Jan', direction: 66, correctScore: 21, overUnder: 62 },
  { month: 'Feb', direction: 68, correctScore: 24, overUnder: 64 },
  { month: 'Mar', direction: 71, correctScore: 26, overUnder: 67 },
];

export const performanceData = [
  { match: 'MCI-LIV', pnl: 9.2 },
  { match: 'MCI-LIV O2.5', pnl: 9.15 },
  { match: 'MCI-LIV CS', pnl: 0 },
  { match: 'BAY-DOR', pnl: -10.0 },
  { match: 'PSG-OM', pnl: 8.8 },
  { match: 'JUV-INT', pnl: 0 },
];

export const agentWeights = [
  { name: 'Tactical', weight: 18, color: '#00D4A0' },
  { name: 'Historical', weight: 14, color: '#3B82F6' },
  { name: 'Form', weight: 16, color: '#00E676' },
  { name: 'Motivation', weight: 12, color: '#8B5CF6' },
  { name: 'Stats', weight: 15, color: '#06B6D4' },
  { name: 'Market', weight: 8, color: '#F97316' },
  { name: 'Weather', weight: 5, color: '#64748B' },
  { name: 'Referee', weight: 4, color: '#EAB308' },
  { name: 'Injury', weight: 8, color: '#EF4444' },
];

// ===== Leagues =====
export const leagues = [
  { name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', count: 12 },
  { name: 'La Liga', flag: '🇪🇸', count: 10 },
  { name: 'Bundesliga', flag: '🇩🇪', count: 9 },
  { name: 'Serie A', flag: '🇮🇹', count: 11 },
  { name: 'Ligue 1', flag: '🇫🇷', count: 8 },
  { name: 'World Cup Qual.', flag: '🌍', count: 6 },
];
