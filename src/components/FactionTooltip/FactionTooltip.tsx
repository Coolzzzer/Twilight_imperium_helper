import { GetFraction } from "../GetFraction/GetFraction";
import styles from "./FactionTooltip.module.css";

type FactionTooltipProps = {
  fraction: string;
  stats: {
    wins: number;
    losses: number;
    winners: string[];
    losers: string[];
  };
  onClose: () => void;
};

function countNames(names: string[]): string {
  const counts: Record<string, number> = {};
  names.forEach((name) => {
    const trimmed = name.trim();
    counts[trimmed] = (counts[trimmed] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([name, count]) => (count > 1 ? `${name}×${count}` : name))
    .join(", ");
}

export const FactionTooltip = ({
  fraction,
  stats,
  onClose,
}: FactionTooltipProps) => (
  <div className={styles.container}>
    <div className={styles.tooltip}>
      <b>
        <GetFraction
          id={Number(fraction)}
          img={true}
          name={true}
          imgToken={false}
          height="1.5vmax"
          fontSize="1.5vmax"
        />
      </b>
      <div className={styles.text}>
        Всего партиий: {stats.wins + stats.losses}
        <br />
        Победы: {stats.wins}, поражения: {stats.losses}
        <br />
        Процент побед:{" "}
        {stats.wins + stats.losses > 0
          ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100)
          : "—"}
        %
      </div>

      <div>
        <h3>Победители:</h3>{" "}
        <div className={styles.text}>
          {stats.winners.length > 0 ? countNames(stats.winners) : "нет"}
        </div>
      </div>
      <div>
        <h3>Проигравшие:</h3>{" "}
        <div className={styles.text}>
          {stats.losers.length > 0 ? countNames(stats.losers) : "нет"}
        </div>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        Закрыть
      </button>
    </div>
  </div>
);
