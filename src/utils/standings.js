export function calculateGroupStandings({ groups, teams, matches, results }) {
  const teamsByCode = new Map(teams.map((team) => [team.code, team]));
  const matchesById = new Map(matches.map((match) => [match.id, match]));

  const standings = Object.fromEntries(
    Object.entries(groups).map(([group, codes]) => [
      group,
      codes.map((code) => createStandingRow(code, teamsByCode.get(code))),
    ]),
  );

  results
    .filter((result) => result.status === 'FT')
    .forEach((result) => {
      const match = matchesById.get(result.matchId);
      if (!match || match.stageCode !== 'G' || !match.group) return;

      const table = standings[match.group];
      if (!table) return;

      const homeRow = table.find((row) => row.code === match.home);
      const awayRow = table.find((row) => row.code === match.away);
      if (!homeRow || !awayRow) return;

      applyResult(homeRow, result.homeScore, result.awayScore);
      applyResult(awayRow, result.awayScore, result.homeScore);
    });

  return Object.fromEntries(
    Object.entries(standings).map(([group, table]) => [
      group,
      table.slice().sort(compareRows).map((row, index) => ({
        ...row,
        rank: index + 1,
        zone: index < 2 ? 'qualified' : index === 2 ? 'third' : 'eliminated',
      })),
    ]),
  );
}

export function calculateBestThirdRanking(groupStandings) {
  return Object.entries(groupStandings)
    .map(([group, table]) => ({ ...table[2], group }))
    .sort(compareRows)
    .map((row, index) => ({
      ...row,
      rank: index + 1,
      zone: index < 8 ? 'third-qualified' : 'third-eliminated',
    }));
}

export function resolveTeamSlot(slot, groupStandings, bestThirdRanking) {
  if (!slot) return null;

  if (/^[12][A-L]$/.test(slot)) {
    const rank = Number(slot[0]);
    const group = slot[1];
    return groupStandings[group]?.find((row) => row.rank === rank)?.team ?? null;
  }

  if (/^3-/.test(slot)) {
    const eligibleGroups = slot.replace('3-', '').split('/');
    return bestThirdRanking.find((row) => eligibleGroups.includes(row.group))?.team ?? null;
  }

  return null;
}

function createStandingRow(code, team) {
  return {
    code,
    team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  };
}

function applyResult(row, goalsFor, goalsAgainst) {
  row.played += 1;
  row.goalsFor += goalsFor;
  row.goalsAgainst += goalsAgainst;
  row.goalDifference = row.goalsFor - row.goalsAgainst;

  if (goalsFor > goalsAgainst) {
    row.won += 1;
    row.points += 3;
  } else if (goalsFor === goalsAgainst) {
    row.drawn += 1;
    row.points += 1;
  } else {
    row.lost += 1;
  }
}

function compareRows(a, b) {
  return (
    b.points - a.points ||
    b.goalDifference - a.goalDifference ||
    b.goalsFor - a.goalsFor ||
    a.team.name.localeCompare(b.team.name)
  );
}
