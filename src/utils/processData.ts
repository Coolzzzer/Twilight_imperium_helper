export function processData(data: any[]) {
    const factionStats: Record<string, { wins: number; losses: number; winRate: number; winners: string[]; losers: string[] }> = {};
    const playerStats: Record<string, { wins: number; losses: number }> = {};
    const playerFactionCount: Record<string, Record<string, number>> = {};
    const tierList: Record<string, string[]> = { S: [], A: [], B: [], C: [], D: [] };
  
    data.forEach(element => {
      if (!element?.set) return;
      element.set.forEach((el: any) => {
        const fraction = el.fraction;
        const quantity = element.quantity;
        const player = el.player.trim();
  
        playerStats[player] ??= { wins: 0, losses: 0 };
        playerFactionCount[player] ??= {};
        playerFactionCount[player][fraction] ??= 0;
        playerFactionCount[player][fraction]++;
  
        factionStats[fraction] ??= { wins: 0, losses: 0, winRate: 0, winners: [], losers: [] };
  
        const isWin = el.result;
        if (isWin) {
          factionStats[fraction].wins++;
          factionStats[fraction].winners.push(` ${player}`);
          playerStats[player].wins++;
          factionStats[fraction].winRate += [0, 0.5, 0.66, 0.75, 0.8, 0.83, 0.86, 0.88][quantity - 1] ?? 1;
        } else {
          factionStats[fraction].losses++;
          factionStats[fraction].losers.push(` ${player}`);
          playerStats[player].losses++;
          factionStats[fraction].winRate -= [0, 0.5, 0.33, 0.25, 0.2, 0.17, 0.14, 0.12][quantity - 1] ?? 1;
        }
      });
    });
  
    const favoriteFactions: Record<string, string> = {};
    for (const player in playerStats) {
      const factionGameStats: Record<string, { games: number; wins: number }> = {};
      data.forEach((element) => {
        element.set?.forEach((el: any) => {
          if (el.player.trim() !== player) return;
          const faction = el.fraction;
          factionGameStats[faction] ??= { games: 0, wins: 0 };
          factionGameStats[faction].games++;
          if (el.result) factionGameStats[faction].wins++;
        });
      });
  
      const eligible = Object.entries(factionGameStats).filter(([_, stat]) => stat.games >= 2);
      if (eligible.length === 0) {
        favoriteFactions[player] = "нет";
        continue;
      }
  
      eligible.sort((a, b) => {
        const gDiff = b[1].games - a[1].games;
        if (gDiff !== 0) return gDiff;
        const wDiff = b[1].wins - a[1].wins;
        if (wDiff !== 0) return wDiff;
        return (b[1].wins / b[1].games) - (a[1].wins / a[1].games);
      });
  
      favoriteFactions[player] = eligible[0][0];
    }
  
    for (const [fraction, data] of Object.entries(factionStats)) {
      const winRate = data.winRate;
      if (winRate >= 1.1) tierList.S.push(fraction);
      else if (winRate >= 0.4) tierList.A.push(fraction);
      else if (winRate >= -0.2) tierList.B.push(fraction);
      else if (winRate >= -0.55) tierList.C.push(fraction);
      else tierList.D.push(fraction);
    }
  
    return { factionStats, playerStats, favoriteFactions, tierList };
  }
  