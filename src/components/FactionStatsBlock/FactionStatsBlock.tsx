import { GetFraction } from "../GetFraction/GetFraction";
import FactionStatsBlockStyle from "./FactionStatsBlock.module.css";
type FactionStatsBlockProps = {
    factionStats: Record<
      string,
      { wins: number; losses: number }
    >;
  };
  
  export const FactionStatsBlock = ({ factionStats }: FactionStatsBlockProps) => (
    <div style={{ flex: 1, minWidth: "30vw" }}>
      <h2>Статистика фракций:</h2>
      {Object.entries(factionStats).map(([fraction, stats]) => (
        <div key={fraction}>
          <GetFraction id={fraction} img={true} name={false} imgToken={false} />:{" "}
          {stats.wins} побед, {stats.losses} поражений
        </div>
      ))}
    </div>
  );
  
