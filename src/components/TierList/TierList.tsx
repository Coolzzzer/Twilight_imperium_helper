import clsx from "clsx";
import { GetFraction } from "../GetFraction/GetFraction";
import styles from "./TierList.module.css";

type TierListProps = {
  tierList: Record<string, string[]>;
  stats: Record<string, { winRate: number }>;
  onHover: (fraction: string) => void;
};

export const TierList = ({ tierList, stats, onHover }: TierListProps) => (
  <>
    {Object.entries(tierList).map(([tier, factions]) => (
      <div key={tier} className={styles.tierRow}>
        {factions.length > 0 && (
          <>
            <img
              src={`https://raw.githubusercontent.com/Coolzzzer/Twilight_imperium_helper/refs/heads/main/src/assets/img/${tier}.png`}
              alt={`${tier} tier`}
              className={clsx(styles.tierIcon, {
                [styles.tierIconO]: tier == "O",
              })}
            />
            <div
              className={clsx(styles.factionGroup, {
                [styles.factionGroupO]: tier == "O",
              })}
            >
              {factions
                .sort((a, b) => stats[b].winRate - stats[a].winRate)
                .map((fraction) => (
                  <button
                    key={fraction}
                    onClick={() => onHover(fraction)}
                    className={styles.fractionButton}
                    aria-label={`Select ${fraction}`}
                  >
                    <GetFraction
                      height="2.5vmax"
                      id={Number(fraction)}
                      img={true}
                      name={false}
                      imgToken={false}
                    />
                  </button>
                ))}
            </div>
          </>
        )}
      </div>
    ))}
  </>
);
