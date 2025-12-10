function calculateStandings(matches, players) {
  const standings = {};
  players.forEach(p => {
    standings[p.id] = { name: p.name, points: 0, games_played: 0, wins: 0 };
  });

  matches.forEach(match => {
    if (match.score_t1 !== null && match.score_t2 !== null) {
      const t1_won = match.score_t1 > match.score_t2;

      // Team 1
      match.team1_ids.forEach(pid => {
        standings[pid].points += parseInt(match.score_t1);
        standings[pid].games_played += 1;
        if (t1_won) standings[pid].wins += 1;
      });

      // Team 2
      match.team2_ids.forEach(pid => {
        standings[pid].points += parseInt(match.score_t2);
        standings[pid].games_played += 1;
        if (!t1_won) standings[pid].wins += 1;
      });
    }
  });

  return Object.values(standings).sort((a, b) => b.points - a.points);
}
