import { useEffect, useState } from "react";
import { processData } from "../../utils/processData";
import { FactionTooltip } from "../../components/FactionTooltip/FactionTooltip";
import { TierList } from "../../components/TierList/TierList";
import { FactionStatsBlock } from "../../components/FactionStatsBlock/FactionStatsBlock";
import { PlayerStatsBlock } from "../../components/PlayerStatsBlock/PlayerStatsBlock";
import StatisticsStyle from "./Statistics.module.css";

export const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [factionStats, setFactionStats] = useState({});
  const [tierList, setTierList] = useState({});
  const [showStats, setShowStats] = useState(false);
  const [hoveredFraction, setHoveredFraction] = useState<string | null>(null);
  const [playerStats, setPlayerStats] = useState({});
  const [favoriteFactions, setFavoriteFactions] = useState({});

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
    const { factionStats, playerStats, favoriteFactions, tierList } = processData(data);
    setFactionStats(factionStats);
    setPlayerStats(playerStats);
    setFavoriteFactions(favoriteFactions);
    setTierList(tierList);
  }, [data]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <>
        <div style={{
            fontSize:"5vh",
            margin:"2vh 0"
        }}><b>Тир-лист фракций:</b></div>
      за <b>{data.length}</b> партий
      {hoveredFraction && (
        <FactionTooltip
          fraction={hoveredFraction}
          stats={factionStats[hoveredFraction]}
          onClose={() => setHoveredFraction(null)}
        />
      )}
      <TierList tierList={tierList} stats={factionStats} onHover={setHoveredFraction} />
      <button onClick={() => setShowStats(!showStats)}>
        {showStats ? "Скрыть статистику" : "Показать общую статистику"}
      </button>
      {showStats && (
        <div style={{ display: "flex", gap: "4vw", flexWrap: "wrap" }}>
          <FactionStatsBlock factionStats={factionStats} />
          <PlayerStatsBlock playerStats={playerStats} favoriteFactions={favoriteFactions} />
        </div>
      )}
    </>
  );
};
