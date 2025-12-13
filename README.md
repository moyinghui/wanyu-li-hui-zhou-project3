# 🎮 Neo Sudoku — React + Vite Project  
A single-player Sudoku game built with **React, Vite, and the Context API**, supporting both **6×6 easy mode** and **9×9 normal mode**, complete with validation, timer, reset/new game features, a Hint system, and persistent state using LocalStorage.

This project was created as part of the CS5610 Web Development course.

---

## 🌐 Live Demo  
🔗 Render Deployment: https://wanyu-li-hui-zhou-project2.onrender.com/

## 📦 GitHub Repository  
🔗 https://github.com/moyinghui/wanyu-li-hui-zhou-project2

---

## 👥 Collaborators  
- Wanyu Li 
- Hui Zhou  

---

## 🎯 Project Overview  

This Sudoku application provides:
- A **Home page**  
- A **Game Selection page**  
- **Easy (6×6) Sudoku**  
- **Normal (9×9) Sudoku**  
- **Rules page**  
- **High Scores (mock)**  
- **Login and Register pages (mock)**  

The Sudoku game supports dynamic gameplay including:
✔ Real-time rule validation  
✔ Incorrect cells highlighted  
✔ Read-only initial puzzle cells  
✔ Timer  
✔ New Game + Reset  
✔ Hint System  
✔ Unique-solution puzzle generator (Backtracking)  
✔ Auto-save and auto-restore via LocalStorage  

---

## 🧩 Features in Detail

### 🎲 Sudoku Gameplay  
- Easy Mode → 6×6 grid with 18 clues  
- Normal Mode → 9×9 grid with ~30 clues  
- All initial values are locked  
- Users may input values anytime and overwrite their previous inputs  
- Incorrect values highlighted in red  
- Game completes automatically once all rules are satisfied  
- Congratulations banner + board freeze on completion  

### 🧠 Hint System (Bonus +5)  
A “Hint” button identifies one empty cell with **exactly one valid possible value** and visually highlights it.

### 💾 Local Storage Persistence (Bonus +3)  
The game automatically saves:
- mode  
- board  
- initial board  
- solution  
- errors  
- time  
- status  
- hint highlight  

Closing the browser and reopening returns to the same game state.

### 🔍 Backtracking for Unique Solution (Bonus +3)  
We implemented:
- A backtracking solver (`countSolutions`)  
- A unique-puzzle generator (`makeUniquePuzzleFromSolution`)  

Each puzzle is guaranteed to have exactly **one** solution.

---

## 📄 Pages & Routes

| Page | Route | Description |
|------|--------|-------------|
| Home | `/` | Game title & navigation |
| Game Selection | `/games` | Select difficulty + authors list |
| Easy Sudoku | `/games/easy` | 6×6 game |
| Normal Sudoku | `/games/normal` | 9×9 game |
| Rules | `/rules` | Game rules + credits |
| High Scores (mock) | `/scores` | Hardcoded sample leaderboard |
| Login | `/login` | Username + password fields |
| Register | `/register` | Registration form |

---

## 🧰 Tech Stack

- **React** (components & hooks)
- **React Router DOM**
- **Vite**
- **Context API** for centralized state management
- **CSS** for UI styling
- **Render** for hosting

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

