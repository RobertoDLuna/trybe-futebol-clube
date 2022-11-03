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

  async saveMatch(req: Request, res: Response) {
    try {
      const { homeTeam, awayTeam } = req.body;
      const { authorization } = req.headers;
      if (homeTeam === awayTeam) {
        return res.status(422)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      const validateHomeTeam = await this.matchesService.findTeamById(homeTeam);
      const validateAwayTeam = await this.matchesService.findTeamById(awayTeam);
      console.log(validateAwayTeam);
      if (!validateHomeTeam || !validateAwayTeam) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }
      const newMatch = await this.matchesService.createNewMatch(req.body, authorization);
      res.status(201).json(newMatch);
    } catch (err) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  async endMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.matchesService.endMatch(+id);
      res.status(200).json({ message: 'Finished' });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
