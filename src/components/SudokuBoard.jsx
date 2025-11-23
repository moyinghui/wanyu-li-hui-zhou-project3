import { useState } from "react";
import { useSudoku } from "../context/SudokuContext";
import "./SudokuBoard.css";

export default function SudokuBoard() {
  const { board, initialBoard, size, errors, updateCell, status } = useSudoku();
  const [selectedKey, setSelectedKey] = useState(null);

  if (!board.length) {
    return <p>No board yet. Click “New Game”.</p>;
  }

  // 子宫格大小：9×9 → 3×3；6×6 → 2×3
  const blockRows = size === 6 ? 2 : 3;
  const blockCols = size === 6 ? 3 : 3;

  function handleChange(e, r, c) {
    updateCell(r, c, e.target.value);
  }

  function handleFocus(r, c) {
    setSelectedKey(`${r}-${c}`);
  }

  return (
    <div
      className={`sudoku-grid ${status === "completed" ? "completed" : ""}`}
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
      }}
    >
      {board.map((row, r) =>
        row.map((cellValue, c) => {
          const isFixed = initialBoard[r][c] !== 0;
          const key = `${r}-${c}`;
          const isError = !!errors[key];
          const isSelected = selectedKey === key;

          let className = "cell";
          if (isFixed) className += " fixed";
          if (isError) className += " error";
          if (isSelected) className += " selected";

          // 子宫格粗边框：块的顶部、左侧 + 外边框
          if (r % blockRows === 0) className += " block-top";
          if (c % blockCols === 0) className += " block-left";
          if (r === size - 1) className += " block-bottom";
          if (c === size - 1) className += " block-right";

          return (
            <input
              key={key}
              className={className}
              value={cellValue === 0 ? "" : cellValue}
              onChange={(e) => handleChange(e, r, c)}
              onFocus={() => handleFocus(r, c)}
              maxLength={1}
              readOnly={isFixed || status === "completed"}
            />
          );
        })
      )}
    </div>
  );
}
