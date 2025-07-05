# 🎮 JavaScript DOM Game Project

## 📖 Overview

With the evolution of technology and our increasing need for mental stimulation, boredom can strike when the brain isn’t adequately engaged. To tackle this, you’ve decided to build your **own browser-based game** — and to make things more challenging, you’ll develop it entirely using **vanilla JavaScript**, **HTML**, and the **DOM**, with **no frameworks or canvas** involved.

This project is a single-player game and serves as both a technical challenge and a playground to master **performance tuning**, **game loops**, and **interactive UI components** in the browser.

---

## 🎯 Objectives

Your goal is to implement a full game that includes the following core features:

### 🧠 Core Requirements

- ✅ The game **must run at a consistent 60 FPS**
- 🚫 **No frame drops** are allowed
- 📈 Efficient use of `requestAnimationFrame` for rendering
- 📊 Performance **must be measured** and optimized (it will be tested)
- 🎮 Keyboard-only controls with **smooth input handling**
- ⏸️ A **Pause Menu** with the following options:
  - Continue
  - Restart
- 🧾 A **Scoreboard** displaying:
  - Countdown or Timer (game duration or time left)
  - Score (XP or points)
  - Player Lives

### 🧩 Rendering Optimizations

- The use of **DOM layers must be minimal**, but **not zero**, to maintain optimal rendering performance.

---

## ⛔ Restrictions

- ❌ **No external frameworks** (e.g., React, Vue, Angular)
- ❌ **No HTML canvas** usage
- ✅ Only **vanilla JavaScript**, HTML, and CSS
- ✅ Use of browser **DevTools** is encouraged

---

## 🎮 Game Genres (Choose One)

Your game must fall within one of the following pre-approved classic genres:

- Bomberman
- Pinball (Flipper)
- Space Invaders
- Donkey Kong
- Brick Breaker (Arkanoid)
- Pac-Man
- Super Mario
- Tetris
- Duck Hunt

---

## 🎮 Gameplay & Controls

- 🕹️ **Keyboard-only** input:
  - Controls should be responsive and allow for **continuous movement** when a key is held down.
  - **Spamming keys should not be necessary** — smooth, non-janky movement is mandatory.

- ⏸️ **Pause System**:
  - Pausing the game should **not drop frames** or degrade performance.
  - Players can resume or restart anytime via the pause menu.

---

## 🛠️ Developer Tools for Debugging

Utilize the browser’s built-in developer tools to profile and debug your game:

### 🔧 Tools to Use

- **Page Inspector** – Inspect and edit HTML/CSS in real-time.
- **Web Console** – View `console.log()` output and test JavaScript live.
- **Performance Tool** – Monitor:
  - FPS and frame drops
  - Paint cycles and composite layers
  - JavaScript function execution time
- **Paint Flashing** – Highlights DOM elements being repainted on every frame (helps to catch unnecessary paints).

> 🧪 The **Performance Tool** is the most critical utility for measuring and debugging animations and responsiveness.

---

## 🧠 Key Concepts & Technologies Learned

- `requestAnimationFrame` for animation timing
- JavaScript Event Loop and task management
- Understanding and achieving **60 FPS**
- DOM manipulation and layout performance
- Handling and avoiding **jank/stutter**
- CSS properties (`transform`, `opacity`) for performant animations
- Game architecture in a **non-canvas**, DOM-based environment

---

## 🧪 Performance Checklist

Before final delivery, ensure your game passes the following checks:

- ✅ Consistent 60 FPS in the **Performance tab**
- ✅ Minimal layout shifts and paint operations
- ✅ No janky animations
- ✅ No dropped frames on interactions or pause
- ✅ All controls work as expected using only the keyboard

---

## 📁 Project Structure (Example)

project-root/
│
├── index.html # Main HTML file
├── style.css # Game styles
├── game.js # Main game loop & logic
├── player.js # Player-related logic
├── utils.js # Utility functions (FPS counter, timer, etc.)
└── assets/ # Images, sounds, etc.


---

## 🚀 Final Notes

This project is an excellent opportunity to:

- Push the limits of vanilla JavaScript and DOM performance
- Develop an end-to-end game from scratch
- Deepen your understanding of browser internals and rendering processes

> 🕹️ Ready to challenge boredom? Build your own game, hit 60 FPS, and have fun while learning!
