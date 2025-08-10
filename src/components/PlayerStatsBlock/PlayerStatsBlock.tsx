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
    <div style={{ position: "relative", flex: 2, minWidth: "40vw" }}>
      {Object.entries(playerStats)
        .sort(([, a], [, b]) => b.wins + b.losses - (a.wins + a.losses))
        .map(([player, stats]) => (
          <div key={player}  style={{ flex: 1 }}>
            <button 
              onClick={() => setSelectedPlayer(player)}
              style={{padding:"5px", backgroundColor:"#030622", margin: "2px"  }}
              
            >
              {favoriteFactions[player] !== "нет" && (
                    <GetFraction id={favoriteFactions[player]} img={true} name={false} imgToken={false} />
                )}
              <b> {player}</b>
            </button>

            {selectedPlayer === player && (
              <div
                style={{
                  zIndex: 2,
                  width: "40vh",
                  padding: "2vh",
                  border: "1px solid black",
                  position: "absolute",
                  borderRadius: "1vh",
                  top: "0",
                  left: "15vw",
                  background: "#1a1a1a3f"
                }}
              >

                <h2>{player}</h2>
                <div>
                  Процент побед:{" "}
                  {stats.wins + stats.losses > 0
                    ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100)
                    : "—"}
                  %
                </div>
                <div>{stats.wins + stats.losses} партий, {stats.wins} побед, {stats.losses} поражений</div>
 
                <div>
                  <h4>Победы на:</h4>{" "}
                  {playerFactionResults[player]?.wins.length > 0 ? (
                    Object.entries(countFactions(playerFactionResults[player].wins)).map(([id, count]) => (
                      <span key={`win-${id}`} style={{ marginRight: "8px", display: "inline-block" }}>
                        <GetFraction height="30vh" id={id} img={true} name={false} imgToken={false} />
                        {count > 1 && <span style={{ fontSize: "0.8em" }}>×{count}</span>}
                      </span>
                    ))
                  ) : (
                    "—"
                  )}
                </div>

                <div>
                  <h4>Поражения на:</h4>{" "}
                  {playerFactionResults[player]?.loses.length > 0 ? (
                    Object.entries(countFactions(playerFactionResults[player].loses)).map(([id, count]) => (
                      <span key={`lose-${id}`} style={{ marginRight: "8px", display: "inline-block" }}>
                        <GetFraction height="30vh" id={id} img={true} name={false} imgToken={false} />
                        {count > 1 && <span style={{ fontSize: "0.8em" }}>×{count}</span>}
                      </span>
                    ))
                  ) : (
                    "—"
                  )}
                {favoriteFactions[player] !== "нет" && (
                  <div>
                    <h4>Любимая фракция:</h4>{" "}
                    <GetFraction height="30vh" id={favoriteFactions[player]} img={true} name={false} imgToken={false} />
                  </div>
                )}
                </div>
                <br />
                <button
                  onClick={() => setSelectedPlayer(null)}
                  style={{
                    border: "none",
                    padding: "10px",
                    backgroundColor:"#030622"
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
