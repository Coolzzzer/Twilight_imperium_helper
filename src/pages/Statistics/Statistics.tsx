import { useEffect, useState } from "react";
import { FactionStatsBlock } from "../../components/FactionStatsBlock/FactionStatsBlock";
import { PlayerStatsBlock } from "../../components/PlayerStatsBlock/PlayerStatsBlock";
import {
  generateFactionStats,
  generatePlayerStats,
  generateFavoriteFactions,
  generatePlayerFactionResults,
} from "../../utils/processData";

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
        const response = await fetch(`http://localhost:5000/date`);
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

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <div style={{ marginBottom: "16px", fontSize: "3vh" }}>
        <button onClick={() => setActiveView("factions")}>
          Статистика фракций
        </button>
        <button onClick={() => setActiveView("players")}>
          Статистика по игрокам
        </button>
      </div>

      <div style={{ display: "flex", gap: "4vw", flexWrap: "wrap" }}>
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
