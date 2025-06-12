import { useEffect, useState } from "react";
import StatisticsStyle from "./Statistics.module.css";
import { GetFraction } from "../../components/GetFraction/GetFraction";

export const Statistics = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any[]>([]);
    const [factionStats, setFactionStats] = useState<Record<string, { wins: number, losses: number }>>({});
    const [tierList, setTierList] = useState<Record<string, string[]>>({});
    const [showStats, setShowStats] = useState<boolean>(false);

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

        const factionData: Record<string, { wins: number, losses: number }> = {};
        const tierGroups: Record<string, string[]> = {
            "S - 75%+ побед": [],
            "A - 50%+ побед": [],
            "B - 25%+ побед": [],
            "C - 10%+ побед": [],
            "D - менее 10% побед": []
        };

        data.forEach((element) => {
            if (!element?.set) return;

            element.set.forEach((el: any) => {
                const fraction = el.fraction;
                if (!factionData[fraction]) {
                    factionData[fraction] = { wins: 0, losses: 0 };
                }
                el.result ? factionData[fraction].wins++ : factionData[fraction].losses++;
            });
        });

        setFactionStats(factionData);

        Object.keys(factionData).forEach((fraction) => {
            const { wins, losses } = factionData[fraction];
            const totalGames = wins + losses;
            const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;

            if (winRate >= 75) {
                tierGroups["S - 75%+ побед"].push(fraction);
            } else if (winRate >= 50) {
                tierGroups["A - 50%+ побед"].push(fraction);
            } else if (winRate >= 25) {
                tierGroups["B - 25%+ побед"].push(fraction);
            } else if (winRate >= 10) {
                tierGroups["C - 10%+ побед"].push(fraction);
            } else {
                tierGroups["D - менее 10% побед"].push(fraction);
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
                {Object.entries(tierList).map(([tierName, factions]) => (
                    <div key={tierName}>
                        <h3>{tierName}</h3>
                        {factions.length > 0 ? (
                            factions.map((fraction) => (
                                <GetFraction key={fraction} id={fraction} img={true} name={false} />
                            ))
                        ) : (
                            <p>Нет фракций в этом тире</p>
                        )}
                    </div>
                ))}
            </div>

            <button onClick={() => setShowStats((prev) => !prev)}>
                {showStats ? "Скрыть статистику" : "Показать статистику"}
            </button>

            {showStats && (
                <div>
                    <h2>Общая статистика фракций:</h2>
                    {Object.entries(factionStats).map(([fraction, stats]) => (
                        <div key={fraction}>
                            <GetFraction id={fraction} img={true} name={false} />: {stats.wins} побед, {stats.losses} поражений
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
