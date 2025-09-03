import { useState } from "react";
import { GetFraction } from "../GetFraction/GetFraction";
import styles from "./PlayerStatsBlock.module.css";

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

export const PlayerStatsBlock = ({
  playerStats,
  favoriteFactions,
  playerFactionResults,
}: PlayerStatsBlockProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      {Object.entries(playerStats)
        .sort(([, a], [, b]) => b.wins + b.losses - (a.wins + a.losses))
        .map(([player, stats]) => (
          <div key={player} className={styles.playerBlock}>
            <button
              onClick={() => setSelectedPlayer(player)}
              className={styles.playerButton}
            >
              {favoriteFactions[player] !== "нет" && (
                <GetFraction
                  id={Number(favoriteFactions[player])}
                  img={true}
                  name={false}
                  imgToken={false}
                  height="2vw"
                />
              )}
              <b>{player}</b>
            </button>
            {selectedPlayer === player && (
              <div className={styles.tooltip}>
                <h2>{player}</h2>
                <div>
                  Процент побед:{" "}
                  {stats.wins + stats.losses > 0
                    ? Math.round(
                        (stats.wins / (stats.wins + stats.losses)) * 100
                      )
                    : "—"}
                  %
                </div>
                <div>
                  {stats.wins + stats.losses} партий, {stats.wins} побед,{" "}
                  {stats.losses} поражений
                </div>

                <div>
                  <h4>Победы на:</h4>
                  {playerFactionResults[player]?.wins.length > 0
                    ? Object.entries(
                        countFactions(playerFactionResults[player].wins)
                      ).map(([id, count]) => (
                        <span key={`win-${id}`} className={styles.factionStat}>
                          <GetFraction
                            height="2vw"
                            id={Number(id)}
                            img={true}
                            name={false}
                            imgToken={false}
                          />
                          {count > 1 && (
                            <span className={styles.count}>×{count}</span>
                          )}
                        </span>
                      ))
                    : "—"}
                </div>

                <div>
                  <h4>Поражения на:</h4>
                  {playerFactionResults[player]?.loses.length > 0
                    ? Object.entries(
                        countFactions(playerFactionResults[player].loses)
                      ).map(([id, count]) => (
                        <span key={`lose-${id}`} className={styles.factionStat}>
                          <GetFraction
                            height="2vw"
                            id={Number(id)}
                            img={true}
                            name={false}
                            imgToken={false}
                          />
                          {count > 1 && (
                            <span className={styles.count}>×{count}</span>
                          )}
                        </span>
                      ))
                    : "—"}
                </div>

                {favoriteFactions[player] !== "нет" && (
                  <div>
                    <h4>Любимая фракция:</h4>
                    <GetFraction
                      height="2vw"
                      id={Number(favoriteFactions[player])}
                      img={true}
                      name={false}
                      imgToken={false}
                    />
                  </div>
                )}

                <button
                  onClick={() => setSelectedPlayer(null)}
                  className={styles.closeButton}
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
