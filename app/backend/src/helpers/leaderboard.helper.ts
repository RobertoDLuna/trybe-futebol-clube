import TeamsModel from '../models/teams.model';
import IMatch from '../interfaces/IMatch';
import ILeaderboard from '../interfaces/ILeaderboards';

function sortLeaderboard(lboard: ILeaderboard[]) {
  const sorted = lboard.sort((a: ILeaderboard, b: ILeaderboard) => {
    if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
    if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
    return b.goalsOwn - a.goalsOwn;
  });
  return sorted;
}

export function calculateTotalGames(matches: IMatch[], teamId: number) {
  const totalGames = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId || curr.awayTeam === teamId) return acc + 1;
    return acc;
  }, 0);
  return totalGames;
}

export function calculateGoalsFavor(matches: IMatch[], teamId: number) {
  const totalGoals = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId) return acc + curr.homeTeamGoals;
    if (curr.awayTeam === teamId) return acc + curr.awayTeamGoals;
    return acc;
  }, 0);
  return totalGoals;
}

export function calculateTotalVictories(matches: IMatch[], teamId: number) {
  const totalVictories = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId && curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
    if (curr.awayTeam === teamId && curr.awayTeamGoals > curr.homeTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return totalVictories;
}

export function calculateTotalDraws(matches: IMatch[], teamId: number) {
  const totalDraws = matches.reduce((acc, curr) => {
    if ((curr.homeTeam === teamId || curr.awayTeam === teamId)
    && curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return totalDraws;
}

export function calculateTotalLosses(matches: Imatch[], teamId: number) {
  const totalLosses = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId && curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
    if (curr.awayTeam === teamId && curr.awayTeamGoals < curr.homeTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return totalLosses;
}
