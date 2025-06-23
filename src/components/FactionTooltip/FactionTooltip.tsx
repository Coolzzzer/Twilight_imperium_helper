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
  
  export const FactionTooltip = ({ fraction, stats, onClose }: FactionTooltipProps) => (
    <div style={{
      zIndex: 2,
      backgroundColor: "white",
      width: "30vh",
      padding: "1vh",
      border: "1px solid black",
      margin: "0 50vh",
      position: "absolute",
      borderRadius: "1vh"
    }}>
      <b><GetFraction id={fraction} img={false} name={true} imgToken={false} /></b>
      <div>Победы: {stats.wins}, поражения: {stats.losses}</div>
      <div><b>Победители:</b> {stats.winners.join(", ") || "нет"}</div>
      <div><b>Проигравшие:</b> {stats.losers.join(", ") || "нет"}</div>
      <button onClick={onClose} style={{ 
        backgroundColor: "grey",
        padding:"-2vh"
     }}>Закрыть</button>
    </div>
  );
  