import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';
import IMatch from '../interfaces/IMatch';
import UserModel from '../models/user.model';
import TokenAuth from '../auths/tokenAuth';

export default class MatchesService {
  constructor(
    private matchesModel: typeof MatchesModel,
    private teamsModel: typeof TeamsModel,
    private userModel: typeof UserModel,
  ) {}

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

  async findTeamById(id: number) {
    const team = await this.teamsModel.findOne({ where: { id } });
    return team;
  }

  async createNewMatch(match: IMatch, authorization: string | undefined) {
    if (!authorization) throw new Error();
    const { data } = TokenAuth.decrypt(authorization);
    const user = await this.userModel.findOne({ where: { password: data.password } });
    if (!user) throw new Error();
    const newMatch = await this.matchesModel.create({ ...match, inProgress: true });
    return newMatch;
  }

  async endMatch(id: number) {
    await this.matchesModel.update({ inProgress: false }, { where: { id } });
  }
}
