import { useState } from "react";
import { GetFraction } from "../GetFraction/GetFraction";
import { FactionTooltip } from "../FactionTooltip/FactionTooltip";
import styles from "./FactionStatsBlock.module.css";

type FactionStatsBlockProps = {
  factionStats: Record<string, { wins: number; losses: number }>;
};

export const FactionStatsBlock = ({ factionStats }: FactionStatsBlockProps) => {
  const [hoveredFraction, setHoveredFraction] = useState<string | null>(null);

  const sortedFactions = Object.entries(factionStats).sort(
    ([, aStats], [, bStats]) => {
      const aTotal = aStats.wins + aStats.losses;
      const bTotal = bStats.wins + bStats.losses;
      return bTotal - aTotal;
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {sortedFactions.map(([fraction]) => (
          <button
            key={fraction}
            onClick={() => setHoveredFraction(fraction)}
            className={styles.fractionButton}
            title={`Фракция ${fraction}`}
          >
            <GetFraction
              height="3vmax"
              id={fraction}
              img={true}
              name={false}
              imgToken={false}
            />
          </button>
        ))}
      </div>

      {hoveredFraction && (
        <div className={styles.tooltipWrapper}>
          <FactionTooltip
            fraction={hoveredFraction}
            stats={factionStats[hoveredFraction]}
            onClose={() => setHoveredFraction(null)}
          />
        </div>
      )}
    </div>
  );
};
