import { useEffect, useState } from "react";
import { FactionStatsBlock } from "../../components/FactionStatsBlock/FactionStatsBlock";
import { PlayerStatsBlock } from "../../components/PlayerStatsBlock/PlayerStatsBlock";
import {
  generateFactionStats,
  generatePlayerStats,
  generateFavoriteFactions,
  generatePlayerFactionResults,
} from "../../utils/processData";
import styles from "./Statistics.module.css";

export const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [factionStats, setFactionStats] = useState({});
  const [playerStats, setPlayerStats] = useState({});
  const [favoriteFactions, setFavoriteFactions] = useState({});
  const [playerFactionResults, setPlayerFactionResults] = useState({});
  const [activeView, setActiveView] = useState<"factions" | "players">(
    "factions"
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://twilight-imperium-helper-api.onrender.com/date`
        );
        if (!response.ok) throw new Error(response.statusText);
        const raw = await response.json();
        setData(raw || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    setPlayerFactionResults(generatePlayerFactionResults(data));
    setFactionStats(generateFactionStats(data));
    const stats = generatePlayerStats(data);
    setPlayerStats(stats);
    setFavoriteFactions(generateFavoriteFactions(data, stats));
  }, [data]);

  if (loading) return <p className={styles.status}>Загрузка...</p>;
  if (error) return <p className={styles.status}>Ошибка: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        <button
          className={`${styles.toggleButton} ${
            activeView === "factions" ? styles.active : ""
          }`}
          onClick={() => setActiveView("factions")}
        >
          Статистика фракций
        </button>
        <button
          className={`${styles.toggleButton} ${
            activeView === "players" ? styles.active : ""
          }`}
          onClick={() => setActiveView("players")}
        >
          Статистика по игрокам
        </button>
      </div>

      <div className={styles.panel}>
        {activeView === "factions" && (
          <FactionStatsBlock factionStats={factionStats} />
        )}
        {activeView === "players" && (
          <PlayerStatsBlock
            playerStats={playerStats}
            favoriteFactions={favoriteFactions}
            playerFactionResults={playerFactionResults}
          />
        )}
      </div>
    </div>
  );
};
