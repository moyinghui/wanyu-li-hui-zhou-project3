import { useSudoku } from "../context/SudokuContext";

export default function Timer() {
  const { elapsedSeconds, status } = useSudoku();

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  const formatted =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

  return (
    <div className="timer">
      <span>Time: </span>
      <span className={status === "completed" ? "timer-finished" : ""}>
        {formatted}
      </span>
    </div>
  );
}
