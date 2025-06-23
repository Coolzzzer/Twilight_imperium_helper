import { GetFraction } from "../GetFraction/GetFraction";

type PlayerStatsBlockProps = {
    playerStats: Record<string, { wins: number; losses: number }>;
    favoriteFactions: Record<string, string>;
  };
  
  export const PlayerStatsBlock = ({ playerStats, favoriteFactions }: PlayerStatsBlockProps) => (
    <div style={{ flex: 1, minWidth: "30vw" }}>
      <h2>Статистика по игрокам:</h2>
      {Object.entries(playerStats)
        .sort(([, a], [, b]) => b.wins + b.losses - (a.wins + a.losses))
        .map(([player, stats]) => (
          <div key={player}>
            <b>{player}</b>: {stats.wins + stats.losses} партий, {stats.wins} побед, {stats.losses} поражений
            {favoriteFactions[player] !== "нет" && (
              <div>
                Любимая Фракция:{" "}
                <GetFraction id={favoriteFactions[player]} img={true} name={false} imgToken={false} />
              </div>
            )}
          </div>
        ))}
    </div>
  );
  