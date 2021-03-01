import express from "express";
import RootController from ".";
import { getAllJokes } from "../../services/fixedSource";

class FixedController {
  static async getJokes(req: express.Request, res: express.Response) {
    const jokes = await getAllJokes();
    RootController.handleSuccessResponse(res, jokes.data);
  }
}

export default FixedController;
