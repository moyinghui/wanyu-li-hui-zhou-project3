import { useState, useRef } from "react";
import { useSudoku } from "../context/SudokuContext";
import "./SudokuBoard.css";

export default function SudokuBoard() {
  const { board, initialBoard, size, errors, updateCell, status, hintCell } =
    useSudoku();
  const [selectedKey, setSelectedKey] = useState(null);
  const inputRefs = useRef({});

  if (!board.length) {
    return <p>No board yet. Click “New Game”.</p>;
  }

  const blockRows = size === 6 ? 2 : 3;
  const blockCols = 3;

  function handleChange(e, r, c) {
    // Check if cell is fixed
    if (initialBoard[r][c] !== 0) {
      return; // Don't allow editing fixed cells
    }
    
    // Check if game is in playing state
    if (status !== "playing") {
      return; // Don't allow editing if game is not in playing state
    }
    
    const inputValue = e.target.value;
    
    // Allow empty string
    if (inputValue === "") {
      updateCell(r, c, "");
      return;
    }
    
    // Extract only digits
    const digits = inputValue.replace(/\D/g, '');
    
    if (digits === "") {
      // No valid digits, clear
      updateCell(r, c, "");
      return;
    }
    
    // Take the last digit if multiple digits entered
    const lastDigit = digits.slice(-1);
    
    // Only allow 1-9
    if (/^[1-9]$/.test(lastDigit)) {
      updateCell(r, c, lastDigit);
    } else {
      // Invalid, clear
      updateCell(r, c, "");
    }
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
          const isHint = hintCell === key;

          let className = "cell";
          if (isFixed) className += " fixed";
          if (isError) className += " error";
          if (isSelected) className += " selected";
          if (isHint) className += " hint";

          if (r % blockRows === 0) className += " block-top";
          if (c % blockCols === 0) className += " block-left";
          if (r === size - 1) className += " block-bottom";
          if (c === size - 1) className += " block-right";

          return (
            <input
              key={key}
              ref={(el) => {
                if (el) inputRefs.current[key] = el;
              }}
              type="text"
              inputMode="numeric"
              className={className}
              value={cellValue && cellValue !== 0 ? String(cellValue) : ""}
              onChange={(e) => handleChange(e, r, c)}
              onFocus={(e) => {
                handleFocus(r, c);
                // Don't select text if cell is fixed
                if (!isFixed) {
                  e.target.select();
                }
              }}
              maxLength={1}
              readOnly={isFixed || status === "completed"}
              disabled={false}
            />
          );
        })
      )}
    </div>
  );
}
