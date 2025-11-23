import { createContext, useContext, useState, useEffect } from "react";

const SudokuContext = createContext(null);

// 6x6 的完整解
const SOLUTION_6 = [
  [1, 2, 3, 4, 5, 6],
  [4, 5, 6, 1, 2, 3],
  [2, 3, 4, 5, 6, 1],
  [5, 6, 1, 2, 3, 4],
  [3, 4, 5, 6, 1, 2],
  [6, 1, 2, 3, 4, 5],
];

// 9x9 的完整解
const SOLUTION_9 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [6, 7, 8, 9, 1, 2, 3, 4, 5],
  [9, 1, 2, 3, 4, 5, 6, 7, 8],
];

function clone2D(array) {
  return array.map((row) => [...row]);
}

// 6x6 用 2x3 block，9x9 用 3x3 block
function getBlockDimensions(size) {
  if (size === 6) {
    return { blockRows: 2, blockCols: 3 };
  }
  return { blockRows: 3, blockCols: 3 };
}

// 从完整解里“挖洞”，保留指定数量的已知格子
function makePuzzleFromSolution(solution, cluesCount) {
  const size = solution.length;
  const totalCells = size * size;

  const indices = Array.from({ length: totalCells }, (_, i) => i);

  // Fisher–Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const keep = new Set(indices.slice(0, cluesCount));

  const puzzle = solution.map((row, r) =>
    row.map((value, c) => {
      const index = r * size + c;
      return keep.has(index) ? value : 0;
    })
  );

  return puzzle;
}

// 计算所有违反规则的格子：返回一个 { "r-c": true } 的 map
function computeErrors(board, size) {
  const errors = {};
  const { blockRows, blockCols } = getBlockDimensions(size);

  const markError = (r, c) => {
    errors[`${r}-${c}`] = true;
  };

  // rows
  for (let r = 0; r < size; r++) {
    const seen = {};
    for (let c = 0; c < size; c++) {
      const v = board[r][c];
      if (v === 0) continue;
      if (!seen[v]) seen[v] = [];
      seen[v].push({ r, c });
    }
    Object.values(seen).forEach((cells) => {
      if (cells.length > 1) cells.forEach(({ r, c }) => markError(r, c));
    });
  }

  // cols
  for (let c = 0; c < size; c++) {
    const seen = {};
    for (let r = 0; r < size; r++) {
      const v = board[r][c];
      if (v === 0) continue;
      if (!seen[v]) seen[v] = [];
      seen[v].push({ r, c });
    }
    Object.values(seen).forEach((cells) => {
      if (cells.length > 1) cells.forEach(({ r, c }) => markError(r, c));
    });
  }

  // blocks
  for (let br = 0; br < size; br += blockRows) {
    for (let bc = 0; bc < size; bc += blockCols) {
      const seen = {};
      for (let r = br; r < br + blockRows; r++) {
        for (let c = bc; c < bc + blockCols; c++) {
          const v = board[r][c];
          if (v === 0) continue;
          if (!seen[v]) seen[v] = [];
          seen[v].push({ r, c });
        }
      }
      Object.values(seen).forEach((cells) => {
        if (cells.length > 1) cells.forEach(({ r, c }) => markError(r, c));
      });
    }
  }

  return errors;
}

export function SudokuProvider({ children }) {
  const [mode, setMode] = useState(null); // 'easy' | 'normal'
  const [size, setSize] = useState(null); // 6 | 9
  const [solutionBoard, setSolutionBoard] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [board, setBoard] = useState([]);
  const [status, setStatus] = useState("idle"); // 'idle' | 'playing' | 'completed'
  const [errors, setErrors] = useState({}); // { "r-c": true }
  const [elapsed, setElapsed] = useState(0); // 秒数

  // 计时器：只在 playing 状态下自增
  useEffect(() => {
    if (status !== "playing") {
      return;
    }

    const id = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    // 清理定时器
    return () => clearInterval(id);
  }, [status]);

  function startNewGame(newMode) {
    const isEasy = newMode === "easy";
    const solution = isEasy ? SOLUTION_6 : SOLUTION_9;
    const clues = isEasy ? 18 : 30;

    const puzzle = makePuzzleFromSolution(solution, clues);

    setMode(newMode);
    setSize(isEasy ? 6 : 9);
    setSolutionBoard(clone2D(solution));
    setInitialBoard(clone2D(puzzle));
    setBoard(clone2D(puzzle));
    setErrors({});
    setElapsed(0);
    setStatus("playing");
  }

  function resetGame() {
    if (!initialBoard.length) return;
    setBoard(clone2D(initialBoard));
    setErrors({});
    setElapsed(0);
    setStatus("playing");
  }

  function updateCell(row, col, value) {
    if (status !== "playing") return;
    if (!board.length) return;

    // 不能改初始格子
    if (initialBoard[row][col] !== 0) return;

    let num;
    if (value === "") {
      num = 0;
    } else {
      num = Number(value);
      if (!Number.isInteger(num)) return;
      if (num < 1 || num > size) return;
    }

    const next = board.map((r) => [...r]);
    next[row][col] = num;

    const nextErrors = computeErrors(next, size);
    setBoard(next);
    setErrors(nextErrors);

    const hasEmpty = next.some((r) => r.includes(0));
    const hasErrors = Object.keys(nextErrors).length > 0;

    if (!hasEmpty && !hasErrors) {
      setStatus("completed");
    } else {
      setStatus("playing");
    }
  }

  const value = {
    mode,
    size,
    solutionBoard,
    initialBoard,
    board,
    status,
    errors,
    elapsedSeconds: elapsed,
    startNewGame,
    resetGame,
    updateCell,
  };


  return (
    <SudokuContext.Provider value={value}>
      {children}
    </SudokuContext.Provider>
  );
}

export function useSudoku() {
  const ctx = useContext(SudokuContext);
  if (!ctx) {
    throw new Error("useSudoku must be used inside SudokuProvider");
  }
  return ctx;
}
