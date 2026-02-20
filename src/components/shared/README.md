# Science Theme Park - Shared Component Library

This directory contains standardized, reusable UI components for the Science Theme Park project. All components are built with **Framer Motion** for smooth animations and follow the **HUD/Glassmorphism** aesthetic.

## 🧱 Components Index

### 🚀 SuccessEureka
The global "Correct Answer" celebration overlay.
- **File**: `SuccessEureka.tsx`
- **Usage**: Managed by `ChamberLayout` via the `showEureka` state.
- **Features**: Particle burst, animated HUD message, and auto-timeout.

### 📊 DataTracker
A versatile time-series or category bar chart.
- **File**: `DataTracker.tsx`
- **Usage**: Used for tracking populations (Salmon Tracker), pollution levels, etc.
- **Props**: `data`, `xAxisLabels`, `maxValue`, `color`.

### ⚡ FlowMonitor
A complex hub-and-spoke visualization for energy or resource flows.
- **File**: `FlowMonitor.tsx`
- **Usage**: Used for energy audits (IWB Hub), water distribution, nutrient cycles.
- **Props**: `sources` (FlowSource[]), `meta` (StatCard data), `hubLabel`.

### 📈 ProgressBar
Discrete (stepped) or continuous progress indicators.
- **File**: `ProgressBar.tsx`
- **Props**: `segments` (for stepped view), `value`, `label`, `subLabel`.

### 🛡️ HUDAlert
Standardized notification system for warnings and prerequisite alerts.
- **File**: `HUDAlert.tsx`
- **Types**: `info`, `warning`, `success`, `error`.

### 💎 StatCard
Small, focused metric display blocks with trend support.
- **File**: `StatCard.tsx`
- **Features**: Icon support, trend indicator (Positive/Delta/Stable), micro-animations.

---

## 🎨 Design System

- **Primary Colors**: 
  - Neon Cyan: `#00f2ff` (System/Physics)
  - Neon Green: `#00ff88` (Biology/Success)
  - Neon Orange: `#ff8800` (Warnings/Chemistry)
- **Backgrounds**: `bg-black/40` or `bg-white/[0.03]` with `backdrop-blur-xl`.
- **Borders**: `border-white/10` or `border-current/30`.

## 🧪 Testing
Shared components are tested using **Jest** and **React Testing Library**.
- Run tests: `npm test src/__tests__/shared/`
