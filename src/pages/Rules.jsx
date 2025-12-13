export default function Rules() {
  return (
    <main className="page">
      <h1 className="page-title">Sudoku Rules</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>How to Play</h2>
        <p>
          Sudoku is a logic-based number puzzle. The goal is to fill a 9×9 grid (or 6×6 in easy mode) 
          with digits so that each row, column, and sub-grid contains each number exactly once.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Rules</h2>
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            <strong>Every row</strong> must contain the numbers 1–X (where X is 6 for easy mode, 9 for normal mode) exactly once.
          </li>
          <li>
            <strong>Every column</strong> must contain the numbers 1–X exactly once.
          </li>
          <li>
            <strong>Every sub-grid</strong> (3×3 blocks in normal mode, 2×3 blocks in easy mode) must contain the numbers 1–X exactly once.
          </li>
          <li>
            The puzzle starts with some cells already filled in (these are fixed and cannot be changed).
          </li>
          <li>
            You can only place numbers in empty cells.
          </li>
          <li>
            The puzzle is solved when all cells are filled correctly according to the rules.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Game Features</h2>
        <ul style={{ lineHeight: "1.8" }}>
          <li><strong>Timer:</strong> Track how long it takes you to solve the puzzle.</li>
          <li><strong>Hint:</strong> Get a hint for a cell that has only one valid solution.</li>
          <li><strong>Reset:</strong> Start over with the original puzzle.</li>
          <li><strong>Validation:</strong> Incorrect entries are highlighted in red.</li>
        </ul>
      </section>

      <section>
        <h2>Credits</h2>
        <p>
          Made by Hui Zhou & Wanyu Li for CS5610 Web Development.
        </p>
      </section>
    </main>
  );
}
