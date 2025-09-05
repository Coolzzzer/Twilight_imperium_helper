import { useEffect, useState } from "react";
import { FactionTooltip } from "../../components/FactionTooltip/FactionTooltip";
import { TierList } from "../../components/TierList/TierList";
import styles from "./Tir.module.css";
import {
  generateFactionStats,
  generateTierList,
} from "../../utils/processData";

export const Tir = () => {
  const [hoveredFraction, setHoveredFraction] = useState<string | null>(null);
  const [tierList, setTierList] = useState({});
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [factionStats, setFactionStats] = useState({});

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
    const fs = generateFactionStats(data);
    setFactionStats(fs);
    setTierList(generateTierList(fs));
  }, [data]);

  if (loading) return <p className={styles.status}>Загрузка...</p>;
  if (error) return <p className={styles.status}>Ошибка: {error}</p>;

  return (
    <>
      <h1>Тир-лист фракций:</h1>
      за <b>{data.length}</b> партий
      {hoveredFraction && (
        <div className={styles.container}>
          <FactionTooltip
            fraction={hoveredFraction}
            stats={factionStats[hoveredFraction]}
            onClose={() => setHoveredFraction(null)}
          />
        </div>
      )}
      <TierList
        tierList={tierList}
        stats={factionStats}
        onHover={setHoveredFraction}
      />
    </>
  );
};
