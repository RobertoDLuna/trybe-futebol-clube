import TeamsModel from '../models/teams.model';

export default class TeamsService {
  constructor(private teamsModel: typeof TeamsModel) {}

  async getAllTeams(): Promise <TeamsModel[]> {
    const allTeams = await this.teamsModel.findAll();
    return allTeams;
  }

  async getById(id: number): Promise <TeamsModel | null> {
    const team = await this.teamsModel.findOne({ where: { id } });
    return team;
  }
}
