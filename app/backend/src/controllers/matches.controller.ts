import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService: MatchesService) {}

  async getAllMatches(req: Request, res: Response) {
    try {
      const allMatches = await this.matchesService.getAllMatches();
      res.status(200).json(allMatches);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
