import { GetFraction } from "../GetFraction/GetFraction";
import FactionTooltipStyle from "./FactionTooltip.module.css";
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
    names.forEach(name => {
      const trimmed = name.trim();
      counts[trimmed] = (counts[trimmed] || 0) + 1;
    });
  
    return Object.entries(counts)
      .map(([name, count]) => (count > 1 ? `${name}×${count}` : name))
      .join(", ");
  }
  export const FactionTooltip = ({ fraction, stats, onClose }: FactionTooltipProps) => (
    <div style={{
      zIndex: 2,
      width: "40vh",
      padding: "1vh",
      border: "1px solid black",
      position: "absolute",
      borderRadius: "1vh",
      background: "#1a1a1a3f"
    }}>
      <b><GetFraction id={fraction} img={true} name={true} imgToken={false} /></b>
      <br />
      Всего партиий: {stats.wins+stats.losses}
      <br />
      <br />
      <div>Победы: {stats.wins}, поражения: {stats.losses}</div>

      <div><h3>Победители:</h3> {stats.winners.length > 0 ? countNames(stats.winners) : "нет"}</div>
      <div><h3>Проигравшие:</h3> {stats.losers.length > 0 ? countNames(stats.losers) : "нет"}</div>
      <button 
        onClick={onClose} 
        style={{
          backgroundColor:"#030622",
          margin:"10px"
        }}
      >Закрыть</button>

    </div>
  );
  