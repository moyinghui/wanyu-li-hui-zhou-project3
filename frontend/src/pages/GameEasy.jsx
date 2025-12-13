import { useSudoku } from "../context/SudokuContext";
import SudokuBoard from "../components/SudokuBoard";
import Timer from "../components/Timer";


export default function GameEasy() {
  const { startNewGame, resetGame, giveHint, board, status } = useSudoku();

  return (
    <main className="page">
      <h1 className="page-title">Easy Game (6x6)</h1>
      <Timer />

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <button onClick={() => startNewGame("easy")}>New Easy Game</button>
        <button
          className="btn-secondary"
          onClick={resetGame}
          disabled={!board.length}
        >
          Reset
        </button>
        <button
          className="btn-secondary"
          onClick={giveHint}
          disabled={!board.length || status !== "playing"}
        >
          Hint
        </button>
      </div>

      {status === "completed" && (
        <p className="status-message success">
          🎉 Congratulations! You solved the easy puzzle.
        </p>
      )}

      {board && board.length ? (
        <SudokuBoard />
      ) : (
        <p>Click "New Easy Game" to generate a board.</p>
      )}
    </main>
  );
}
