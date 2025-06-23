import { useEffect, useState } from "react";
import StatisticsStyle from "./Statistics.module.css";
import { GetFraction } from "../../components/GetFraction/GetFraction";

export const Statistics = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any[]>([]);
    const [factionStats, setFactionStats] = useState<Record<string, { wins: number, losses: number, winners: string[], losers: string[] }>>({});
    const [tierList, setTierList] = useState<Record<string, string[]>>({});
    const [showStats, setShowStats] = useState<boolean>(false);
    const [hoveredFraction, setHoveredFraction] = useState<string | null>(null);   
    useEffect(() => {
        async function fetchFactionById() {
            try {
                const response = await fetch(`http://localhost:5000/date`);
                if (!response.ok) {
                    throw new Error(`Ошибка при получении фракции: ${response.statusText}`);
                }
                const da = await response.json();

                setData(da || []);
            } catch (err: any) {
                setError(err.message);
                console.error("Ошибка загрузки фракции:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchFactionById();
    }, []);

    useEffect(() => {
        if (data.length === 0) return;

        const factionData: Record<string, { wins: number, losses: number, winRate: number, winners:any, losers: any }> = {};
        const tierGroups: Record<string, string[]> = {
            "S": [],
            "A": [],
            "B": [],
            "C": [],
            "D": []
        };

        data.forEach((element) => {
            if (!element?.set) return;
            element.set.forEach((el: any) => {
                const fraction = el.fraction;
                const quantity = element.quantity
                if (!factionData[fraction]) {
                    factionData[fraction] = { wins: 0, losses: 0, winRate: 0, winners: [], losers: [] };
                }
                if(el.result){
                    factionData[fraction].winners.push(` ${el.player}`)
                    factionData[fraction].wins++
                    if(quantity == 2){
                        factionData[fraction].winRate+=0.5
                    }
                    if(quantity == 3){
                        factionData[fraction].winRate+=0.66
                    }
                    if(quantity == 4){
                        factionData[fraction].winRate+=0.75
                    }
                    if(quantity == 5){
                        factionData[fraction].winRate+=0.8
                    }
                    if(quantity == 6){
                        factionData[fraction].winRate+=0.83
                    }
                    if(quantity == 7){
                        factionData[fraction].winRate+=0.86
                    }
                    if(quantity == 7){
                        factionData[fraction].winRate+=0.88
                    }
                }  else{
                    factionData[fraction].losses++;
                    factionData[fraction].losers.push(` ${el.player}`)
                    if(quantity == 2){
                        factionData[fraction].winRate-=0.5
                    }
                    if(quantity == 3){
                        factionData[fraction].winRate-=0.33
                    }
                    if(quantity == 4){
                        factionData[fraction].winRate-=0.25
                    }
                    if(quantity == 5){
                        factionData[fraction].winRate-=0.2
                    }
                    if(quantity == 6){
                        factionData[fraction].winRate-=0.17
                    }
                    if(quantity == 7){
                        factionData[fraction].winRate-=0.14
                    }
                    if(quantity == 7){
                        factionData[fraction].winRate-=0.12
                    }
                    
                }
            });
        });

        setFactionStats(factionData);
        Object.keys(factionData).forEach((fraction) => {
            const winRate  = factionData[fraction].winRate;            
            if (winRate >= 1.5) {
                tierGroups["S"].push(fraction);
            } else if (winRate >= 0.9) {
                tierGroups["A"].push(fraction);
            } else if (winRate >= 0.3) {
                tierGroups["B"].push(fraction);
            } else if (winRate >= -0.2) {
                tierGroups["C"].push(fraction);
            } else {
                tierGroups["D"].push(fraction);
            }
        });

        setTierList(tierGroups);
    }, [data]);

    if (loading) return <p>Загрузка данных...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <>
            <div>
                
                <h2>Тир-лист фракций:</h2>
                {hoveredFraction && (
                    <div className={StatisticsStyle.tooltip} style={{
                    zIndex:2,
                    backgroundColor:"white", 
                    width:"30vh",
                    padding:"1vh",
                    border: "1px solid black",
                    margin: "20vh",
                    position: "absolute",
                    borderRadius: "1vh"
                    }}>
                        <GetFraction imgToken={false} id={hoveredFraction} img={false} name={true} />
                        <div>Победы: {factionStats[hoveredFraction]?.wins ?? 0}, 
                        поражения: {factionStats[hoveredFraction]?.losses ?? 0}</div>
                        <div>Победители: {factionStats[hoveredFraction]?.winners.join(", ") || "нет"}</div>
                        <div>Проигравшие: {factionStats[hoveredFraction]?.losers.join(", ") || "нет"}</div>
                        <button onClick={() => setHoveredFraction(null)} style={{backgroundColor:"grey"}}>Закрыть</button>
                    </div>
                )}

                {Object.entries(tierList).map(([tierName, factions]) => (
                    
                    <div key={tierName}>
                        <h3>{tierName}</h3>
                        {factions.length > 0 ? (
                            factions.map((fraction) => (
                                <button
                                onClick={() => setHoveredFraction(fraction)}
                                >
                                    <GetFraction imgToken={false} key={fraction} id={fraction} img={true} name={false} />
                                </button>
                                
                            ))
                        ) : (
                            <p>Нет фракций в этом тире</p>
                        )}


                    </div>
                ))}
            </div>

            <button onClick={() => setShowStats((prev) => !prev)}>
                {showStats ? "Скрыть статистику" : "Показать общую статистику"}
            </button>

            {showStats && (
                <div>
                    <h2>Общая статистика фракций:</h2>
                    {Object.entries(factionStats).map(([fraction, stats]) => (
                        <div key={fraction}>
                            <GetFraction imgToken={false} id={fraction} img={true} name={false} />: {stats.wins} побед, {stats.losses} поражений
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
