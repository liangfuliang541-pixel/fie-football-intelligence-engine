# ⚽ FIE — Football Intelligence Engine

> **足球世界的数字孪生** | Digital Twin of the Football World

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-EF47A8?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Recharts-2.15-22B5BF?logo=recharts&logoColor=white" alt="Recharts" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg" alt="PRs Welcome" />
</p>

<p align="center">
  <a href="https://3gacdxhrr53xu.ok.kimi.link">🌐 在线预览 (Live Demo)</a> •
  <a href="#-快速开始">🚀 快速开始</a> •
  <a href="#-项目架构">🏗️ 架构</a> •
  <a href="#-贡献指南">🤝 贡献</a>
</p>

---

## 🌍 项目愿景 / Vision

**FIE（Football Intelligence Engine）** 不只是一个足球数据面板，它是**足球世界的数字孪生**——一个用数据和智能技术映射真实足球世界运转规律的系统。

我们致力于构建一个开放、智能、社区驱动的足球分析平台，让每一个足球爱好者都能获得专业级的赛前洞察、实时战况解析和赛后深度复盘。

> *FIE is not just a football dashboard — it's a Digital Twin of the Football World. An open, intelligent, community-driven platform that brings professional-grade match insights to every football enthusiast.*

---

## ✨ 核心特性 / Features

### 🏠 Dashboard 智能总览
- 实时比赛监控与赛程概览
- 预测准确率趋势追踪
- 联赛快捷导航

### 📅 赛事中心 Match Center
- 多联赛筛选（英超/西甲/德甲/意甲/法甲/世界杯）
- 智能搜索与状态分组
- 完整的赔率与数据展示

### 🔮 赛前预测 Pre-Match Intelligence
- **胜平负概率** — 基于多维数据建模
- **波胆网格** — 6×4 比分概率热力图
- **大小球/双方进球** — O/U + BTTS 双维度分析
- **三级推荐体系** — Safe / Medium / High Risk 分级建议
- **战意评级** — A~E 五维战意评估模型

### 📡 Live 实时监控
- 大型动态记分牌 + 事件时间线
- 实时统计对比（射门/控球/角球等）
- FIE AI 实时分析面板
- 波胆存活追踪器
- **三分支剧本树** — 比赛走向智能推演

### 💼 持仓管理 Portfolio
- 预测持仓追踪与风险管理
- 盈亏可视化分析
- 风险预警系统

### 📊 赛后复盘 Post-Match Review
- 预测 vs 实际对比分析
- 六维雷达图深度评估
- 模型学习规则自动提炼

### 🧠 多 Agent 圆桌讨论 / Multi-Agent Roundtable ⭐ Signature Feature
FIE 的标志性功能——**10 个独立 AI Agent 并行分析，交叉验证，最终输出中文共识研判报告**。

| Agent | 职责 | 颜色 |
|-------|------|------|
| 🎯 联赛画像师 | 联赛风格与统计特征分析 | 🔵 蓝 |
| 📈 状态分析师 | 球队近期状态与走势评估 | 🟢 青 |
| 💰 赔率分析师 | 盘口赔率价值深度解读 | 🟡 黄 |
| 📚 历史数据师 | 历史交锋与数据挖掘 | 🟣 紫 |
| ⚠️ 风险预警师 | 潜在风险因素识别 | 🔴 红 |
| 🏃 教练解读师 | 战术风格与排兵布阵分析 | 🟢 绿 |
| 🏁 裁判解读师 | 执法风格影响评估 | 🟠 橙 |
| ⭐ 球员解读师 | 关键球员状态与对位分析 | 🔵 青蓝 |
| 🔬 资深分析师 | 综合分析与交叉验证 | 🩷 粉 |
| 🎤 圆桌主持人 | 共识整合与中文报告输出 | 🟣 紫(中心) |

---

## 🎨 界面预览 / Preview

**👉 [点击体验在线版本](https://3gacdxhrr53xu.ok.kimi.link)**

---

## 🚀 快速开始 / Quick Start

```bash
# 1. 克隆仓库
git clone https://github.com/liangfuliang541-pixel/fie-football-intelligence-engine.git
cd fie-football-intelligence-engine

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 构建生产版本
npm run build
```

---

## 🏗️ 项目架构 / Architecture

```
fie-football-intelligence-engine/
├── 📁 src/
│   ├── 📁 components/          # 共享组件
│   ├── 📁 pages/               # 7 大功能页面
│   ├── 📁 data/                # Mock 数据
│   ├── 📁 hooks/               # 自定义 Hooks
│   ├── App.tsx                 # 路由配置
│   ├── main.tsx                # 应用入口
│   └── index.css               # 全局样式
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 🤝 贡献指南 / Contributing

我们热烈欢迎所有贡献者！

1. **Fork 本仓库**
2. **创建功能分支** `git checkout -b feature/AmazingFeature`
3. **提交改动** `git commit -m 'Add some AmazingFeature'`
4. **推送分支** `git push origin feature/AmazingFeature`
5. **打开 Pull Request**

---

## 📜 开源协议 / License

[MIT License](LICENSE) — 自由使用、修改和分发。

---

<p align="center">
  <i>Made with ⚽ by football enthusiasts, for football enthusiasts.</i><br/>
  <i>由足球爱好者打造，献给所有热爱足球的人。</i>
</p>
