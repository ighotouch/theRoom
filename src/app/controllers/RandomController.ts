import express from "express";
import RootController from ".";
import { getAnimeService } from "../../services/randomSource";

class RandomController {
  static async getAnime(req: express.Request, res: express.Response) {
    const jokes = await getAnimeService();
    RootController.handleSuccessResponse(res, jokes.data);
  }
}

export default RandomController;
