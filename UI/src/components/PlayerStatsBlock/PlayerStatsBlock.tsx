import { useState } from "react";
import { GetFraction } from "../GetFraction/GetFraction";

type PlayerStatsBlockProps = {
  playerStats: Record<string, { wins: number; losses: number }>;
  favoriteFactions: Record<string, string>;
  playerFactionResults: Record<string, { wins: string[]; loses: string[] }>;
};

function countFactions(factions: string[]): Record<string, number> {
  return factions.reduce<Record<string, number>>((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});
}

export const PlayerStatsBlock = ({ playerStats, favoriteFactions, playerFactionResults }: PlayerStatsBlockProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  return (
    <div style={{ position: "relative", flex: 1, minWidth: "40vw" }}>
      <h2>Статистика по игрокам:</h2>
      {Object.entries(playerStats)
        .sort(([, a], [, b]) => b.wins + b.losses - (a.wins + a.losses))
        .map(([player, stats]) => (
          <div key={player} style={{ marginBottom: "10px" }}>
            <button 
              onClick={() => setSelectedPlayer(player)}
              style={{padding:"3px"}}
            >
              <b>{player}</b>: {stats.wins + stats.losses} партий, {stats.wins} побед, {stats.losses} поражений
            </button>

            {selectedPlayer === player && (
              <div
                style={{
                  position: "absolute",
                  left: "-35vw",
                  top: "20vh",
                  backgroundColor: "#1a1a1a70",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  padding: "16px",
                  zIndex: 999,
                  width: "30vw",
                  borderRadius: "10px",
                }}
              >

                <h3>{player}</h3>

                <div>
                  <b>Победы на фракциях:</b>{" "}
                  {playerFactionResults[player]?.wins.length > 0 ? (
                    Object.entries(countFactions(playerFactionResults[player].wins)).map(([id, count]) => (
                      <span key={`win-${id}`} style={{ marginRight: "8px", display: "inline-block" }}>
                        <GetFraction id={id} img={true} name={false} imgToken={false} />
                        {count > 1 && <span style={{ fontSize: "0.8em" }}>×{count}</span>}
                      </span>
                    ))
                  ) : (
                    "—"
                  )}
                </div>

                <div>
                  <b>Поражения на фракциях:</b>{" "}
                  {playerFactionResults[player]?.loses.length > 0 ? (
                    Object.entries(countFactions(playerFactionResults[player].loses)).map(([id, count]) => (
                      <span key={`lose-${id}`} style={{ marginRight: "8px", display: "inline-block" }}>
                        <GetFraction id={id} img={true} name={false} imgToken={false} />
                        {count > 1 && <span style={{ fontSize: "0.8em" }}>×{count}</span>}
                      </span>
                    ))
                  ) : (
                    "—"
                  )}
                {favoriteFactions[player] !== "нет" && (
                  <div>
                    <br />
                    <b>Любимая фракция:</b>{" "}
                    <GetFraction id={favoriteFactions[player]} img={true} name={false} imgToken={false} />
                  </div>
                )}
                </div>
                <button
                  onClick={() => setSelectedPlayer(null)}
                  style={{
                    float: "right",
                    marginBottom: "8px",
                    border: "none",
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                >
                  Закрыть
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
