import { Link } from 'react-router-dom';

export default function GameSelection() {
  return (
    <main className="page">
      <h1 className="page-title">Select a Game</h1>
      <ul className="game-list">
        <li><Link to="/games/easy">6×6 Easy – by Alice</Link></li>
        <li><Link to="/games/normal">9×9 Normal – by Bob</Link></li>
      </ul>
    </main>
  );
}
