import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService: MatchesService) {}

  async getAllMatches(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      let allMatches;
      if (inProgress) {
        const isInProgress = inProgress === 'true';
        allMatches = await this.matchesService.getByQuery(isInProgress);
      } else {
        allMatches = await this.matchesService.getAllMatches();
      }
      res.status(200).json(allMatches);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
