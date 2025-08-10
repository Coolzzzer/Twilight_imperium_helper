import { useState } from "react";
import { GetFraction } from "../GetFraction/GetFraction";
import { FactionTooltip } from "../FactionTooltip/FactionTooltip";
type FactionStatsBlockProps = {
    factionStats: Record<
      string,
      { wins: number; losses: number }
    >;
  };
  
  export const FactionStatsBlock = ({ factionStats }: FactionStatsBlockProps) => {
    const [hoveredFraction, setHoveredFraction] = useState<string | null>(null);
    
    return (
      <div style={{ flex: 1, minWidth: "30vw" }}>
      <div>
        {Object.entries(factionStats)
        .sort(([,aStats],[,bStats])=>{
            const aTotal = aStats.wins + aStats.losses;
            const bTotal = bStats.wins + bStats.losses;
            return bTotal - aTotal;
        })
        .map(([fraction]) => (
          <button 
            key={fraction}
            onClick={() => setHoveredFraction(fraction)}
            style={{
              height:"6vh",
              width:"6vh",
              padding:"3px",
              margin:"0.5vh",
              backgroundColor:"#030622"   
            }}  
          >
            <GetFraction  height="40vw"  id={fraction} img={true} name={false} imgToken={false} />
          </button>
        ))}
      </div>
      {hoveredFraction && (
        <div style={{                  
          position: "absolute",
          top: "30vh",
          left: "30vw"
        }}>
          <FactionTooltip
            fraction={hoveredFraction}
            stats={factionStats[hoveredFraction]}
            onClose={() => setHoveredFraction(null)}
          />
        </div>

      )}
    </div>
    )
  };
  
