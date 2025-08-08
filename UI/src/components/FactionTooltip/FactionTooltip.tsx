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
      width: "40vh",
      padding: "1vh",
      border: "1px solid black",
      position: "absolute",
      borderRadius: "1vh",
    }}>
      <b><GetFraction id={fraction} img={true} name={true} imgToken={false} /></b>
      <br />
      Всего партиий: {stats.wins+stats.losses}
      <br />
      <br />
      <div>Победы: {stats.wins}, поражения: {stats.losses}</div>

      <div><b>Победители:</b> {stats.winners.join(", ") || "нет"}</div>
      <div><b>Проигравшие:</b> {stats.losers.join(", ") || "нет"}</div>
      <button onClick={onClose} >Закрыть</button>
    </div>
  );
  