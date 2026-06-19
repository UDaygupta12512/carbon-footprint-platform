# 🌍 EcoTrack: Carbon Footprint Awareness Platform

**EcoTrack** is a highly interactive, beautifully designed React application aimed at helping individuals track, understand, and reduce their carbon footprint through gamification, real-time analytics, and actionable micro-habits.

Built with **Vite, React, Tailwind CSS, Framer Motion, and Recharts**, this platform features a stunning flat minimalist aesthetic and focuses on a premium user experience.

![EcoTrack App](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-purple)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)

## ✨ Core Features

*   **📊 Detailed Analytics & Insights:** Deep dive into your emissions breakdown using beautiful interactive donut and bar charts. See your 6-month historical impact trend.
*   **🏆 Immersive Trophy Room:** An engaging gamified experience. Unlock premium badges by completing quests, complete with particle confetti animations and a "Next Milestone" progress tracker.
*   **🕹️ Swipe-to-Sort Recycle Game:** A Tinder-style interactive minigame where users drag and drop items into "Trash", "Recycle", or "Compost" to earn Eco-Tokens.
*   **🛒 Reward Store:** Spend your hard-earned Eco-Tokens on virtual rewards (like planting trees or unlocking premium CSS themes).
*   **📉 "What If" Calculator:** A dynamic slider tool that recalculates your carbon score in real-time based on proposed lifestyle changes (e.g., cutting meat consumption by 50%).
*   **💰 Carbon Budget Tracker:** Visually track your monthly carbon allowance with an animated progress bar and smart alerts.
*   **🎨 Premium UI/UX:** Features a custom flat minimalist design system, fluid page transitions with Framer Motion, dynamic dark/light mode switching, and beautiful toast notifications.

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/UDaygupta12512/carbon-footprint-platform.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd carbon-footprint-platform
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
5.  **Open in your browser:**
    Navigate to `http://localhost:5173/`

## 🛠️ Tech Stack

*   **Frontend Framework:** React 18
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS + Custom Vanilla CSS Variables
*   **Animations:** Framer Motion
*   **Data Visualization:** Recharts
*   **Icons:** Lucide React
*   **Notifications:** React Hot Toast
*   **Effects:** Canvas Confetti

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components and main app views
│   ├── ActionCenter.jsx # Quick quests to reduce emissions
│   ├── Analytics.jsx    # Recharts data visualization dashboard
│   ├── CarbonBudget.jsx # Visual allowance tracker
│   ├── Dashboard.jsx    # Main overview screen
│   ├── Gamification.jsx # The Trophy Room
│   ├── LandingPage.jsx  # Welcome screen
│   ├── Onboarding.jsx   # Initial interactive survey
│   ├── RecycleGame.jsx  # Swipe-to-sort minigame
│   ├── RewardStore.jsx  # Virtual token economy shop
│   └── WhatIfCalculator.jsx # Dynamic impact calculator
├── App.jsx              # Main routing and global state management
├── index.css            # Core utility classes and theme tokens
└── main.jsx             # React entry point
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/UDaygupta12512/carbon-footprint-platform/issues).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
