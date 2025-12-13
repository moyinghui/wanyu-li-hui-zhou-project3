import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="page">
      <h1 className="page-title">Neo Sudoku</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Welcome to Neo Sudoku! Test your logic and problem-solving skills.
      </p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <Link to="/rules" className="btn-primary" style={{ minWidth: "200px", textAlign: "center" }}>
          View Rules
        </Link>
        <Link to="/games" className="btn-primary" style={{ minWidth: "200px", textAlign: "center" }}>
          Play Game
        </Link>
      </div>
    </main>
  );
}
