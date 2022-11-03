import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';

export default class MatchesService {
  constructor(private matchesModel: typeof MatchesModel) {}

  async getAllMatches(): Promise <MatchesModel []> {
    const allMatches = await this.matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  }

  async getByQuery(params: boolean) {
    const allMatches = await this.matchesModel.findAll({
      where: { inProgress: params },
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  }
}
