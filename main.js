import React, { useState, useMemo } from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18/client";

/* ---------------- SAFETY CHECK ---------------- */
console.log("Dashboard loaded");

/* ---------------- DATA ---------------- */

const games = [
  {
    id: "1",
    away: "Red Sox",
    home: "Yankees",
    market: "ML",
    model: 58,
    marketPct: 52,
    edge: 6,
    factors: { log5: 0.5, park: 1.02, weather: 0.98, pitcher: 1.1 },
    trace: ["load", "calc", "edge detected"]
  },
  {
    id: "2",
    away: "Dodgers",
    home: "Giants",
    market: "TOT",
    model: 45,
    marketPct: 42,
    edge: 3,
    factors: { log5: 0.48, park: 0.95, weather: 1.0, pitcher: 1.02 },
    trace: ["load", "adjust wind", "edge found"]
  }
];

/* ---------------- APP ---------------- */

function App() {
  const [selected, setSelected] = useState(null);

  const selectedGame = useMemo(() => {
    return games.find(g => g.id === selected) || null;
  }, [selected]);

  return (
    <div className="dashboard">
      <Left games={games} onSelect={setSelected} />
      <Right game={selectedGame} />
    </div>
  );
}

/* ---------------- LEFT ---------------- */

function Left({ games, onSelect }) {
  return (
    <div className="left">
      <div className="header">Games</div>

      <table>
        <thead>
          <tr>
            <th>Matchup</th>
            <th>Market</th>
            <th>Model</th>
            <th>Market</th>
            <th>Edge</th>
          </tr>
        </thead>

        <tbody>
          {games.map(g => (
            <tr key={g.id} onClick={() => onSelect(g.id)}>
              <td>{g.away} @ {g.home}</td>
              <td>{g.market}</td>
              <td>{g.model}%</td>
              <td>{g.marketPct}%</td>
              <td className={edgeColor(g.edge)}>{g.edge}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- RIGHT ---------------- */

function Right({ game }) {
  if (!game) {
    return (
      <div className="right">
        <div className="placeholder">Select a game</div>
      </div>
    );
  }

  return (
    <div className="right">
      <div className="header">{game.away} @ {game.home}</div>

      <div className="card">Model: {game.model}%</div>
      <div className="card">Market: {game.marketPct}%</div>
      <div className="card">Edge: {game.edge}%</div>

      <div className="card">
        Factors:
        <div>Log5: {game.factors.log5}</div>
        <div>Park: {game.factors.park}</div>
        <div>Weather: {game.factors.weather}</div>
        <div>Pitcher: {game.factors.pitcher}</div>
      </div>

      <div className="card">
        Trace:
        {game.trace.map((t, i) => (
          <div key={i}>→ {t}</div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function edgeColor(edge) {
  if (edge >= 5) return "green";
  if (edge >= 2) return "blue";
  if (edge >= 0) return "gray";
  return "red";
}

/* ---------------- RENDER ---------------- */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
