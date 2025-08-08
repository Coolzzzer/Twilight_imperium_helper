import { GetFraction } from "../GetFraction/GetFraction";
import TierListStyle from "./TierList.module.css";
type TierListProps = {
    tierList: Record<string, string[]>;
    stats: Record<string, { winRate: number }>;
    onHover: (fraction: string) => void;
  };
  
  export const TierList = ({ tierList, stats, onHover }: TierListProps) => (
    <>
      {Object.entries(tierList).map(([tier, factions]) => (
        <div key={tier}>
          <b style={{fontSize:"4vh"}}>{tier} </b>
          {factions.length === 0 ? (
            <p>Нет фракций в этом тире</p>
          ) : (
            [...factions]
              .sort((a, b) => stats[b].winRate - stats[a].winRate)
              .map(fraction => (
                <button key={fraction} onClick={() => onHover(fraction)} style={{
                    padding:"1vh",
                    margin:"0.5vh",
                    backgroundColor:"#030622",
                }}>
                  <GetFraction height="30vh" id={fraction} img={true} name={false} imgToken={false} />
                </button>
              ))
          )}
        </div>
      ))}
    </>
  );
  