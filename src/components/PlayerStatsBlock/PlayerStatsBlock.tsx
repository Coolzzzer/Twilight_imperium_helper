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

  const sortedPlayers = Object.entries(playerStats).sort(
    ([, a], [, b]) => b.wins + b.losses - (a.wins + a.losses)
  );

  return (
    <div className={styles.container}>
      {/* Все игроки */}
      {sortedPlayers.map(([player]) => (
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
                height="1.5vmax"
              />
            )}
            <b>{player}</b>
          </button>
        </div>
      ))}

      {/* Выбранный игрок внизу */}
      {selectedPlayer && (
        <div className={styles.selectedRow}>
          <div className={styles.playerBlock}>
            <button
              onClick={() => setSelectedPlayer(null)}
              className={styles.playerButton}
            >
              {favoriteFactions[selectedPlayer] !== "нет" && (
                <GetFraction
                  id={Number(favoriteFactions[selectedPlayer])}
                  img={true}
                  name={false}
                  imgToken={false}
                  height="1.5vmax"
                />
              )}
              <b>{selectedPlayer}</b>
            </button>
          </div>

          <div className={styles.tooltip}>
            <h2>{selectedPlayer}</h2>
            <div>
              Процент побед:{" "}
              {playerStats[selectedPlayer].wins +
                playerStats[selectedPlayer].losses >
              0
                ? Math.round(
                    (playerStats[selectedPlayer].wins /
                      (playerStats[selectedPlayer].wins +
                        playerStats[selectedPlayer].losses)) *
                      100
                  )
                : "—"}
              %
            </div>
            <div>
              {playerStats[selectedPlayer].wins +
                playerStats[selectedPlayer].losses}{" "}
              партий, {playerStats[selectedPlayer].wins} побед,{" "}
              {playerStats[selectedPlayer].losses} поражений
            </div>

            <div>
              <h4>Победы на:</h4>
              {playerFactionResults[selectedPlayer]?.wins.length > 0
                ? Object.entries(
                    countFactions(playerFactionResults[selectedPlayer].wins)
                  ).map(([id, count]) => (
                    <span key={`win-${id}`} className={styles.factionStat}>
                      <GetFraction
                        height="3vmin"
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
              {playerFactionResults[selectedPlayer]?.loses.length > 0
                ? Object.entries(
                    countFactions(playerFactionResults[selectedPlayer].loses)
                  ).map(([id, count]) => (
                    <span key={`lose-${id}`} className={styles.factionStat}>
                      <GetFraction
                        height="3vmin"
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

            {favoriteFactions[selectedPlayer] !== "нет" && (
              <div>
                <h4>Любимая фракция:</h4>
                <GetFraction
                  height="2vmax"
                  id={Number(favoriteFactions[selectedPlayer])}
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
        </div>
      )}
    </div>
  );
};
