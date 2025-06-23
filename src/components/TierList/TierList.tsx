import { GetFraction } from "../GetFraction/GetFraction";

type TierListProps = {
    tierList: Record<string, string[]>;
    stats: Record<string, { winRate: number }>;
    onHover: (fraction: string) => void;
  };
  
  export const TierList = ({ tierList, stats, onHover }: TierListProps) => (
    <>
      {Object.entries(tierList).map(([tier, factions]) => (
        <div key={tier}>
          <h3>{tier}</h3>
          {factions.length === 0 ? (
            <p>Нет фракций в этом тире</p>
          ) : (
            [...factions]
              .sort((a, b) => stats[b].winRate - stats[a].winRate)
              .map(fraction => (
                <button key={fraction} onClick={() => onHover(fraction)}>
                  <GetFraction id={fraction} img={true} name={false} imgToken={false} />
                </button>
              ))
          )}
        </div>
      ))}
    </>
  );
  