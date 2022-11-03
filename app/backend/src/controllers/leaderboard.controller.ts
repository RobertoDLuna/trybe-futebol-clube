import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

const defaultServerError = 'Interal server error';

export default class LeaderboardController {
  constructor(private leaderBoardService: LeaderboardService) {}

  async getAll(req: Request, res: Response) {
    try {
      const leaderBoard = await this.leaderBoardService.getAll();
      res.status(200).json(leaderBoard);
    } catch (err) {
      res.status(500).json({ message: defaultServerError });
    }
  }

  async getHome(req: Request, res: Response) {
    try {
      const leaderBoard = await this.leaderBoardService.getHome();
      res.status(200).json(leaderBoard);
    } catch (err) {
      res.status(500).json({ message: defaultServerError });
    }
  }

  async getAway(req: Request, res: Response) {
    try {
      const leaderBoard = await this.leaderBoardService.getAway();
      res.status(200).json(leaderBoard);
    } catch (err) {
      res.status(500).json({ message: defaultServerError });
    }
  }
}
