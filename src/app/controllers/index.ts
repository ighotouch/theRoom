import express from "express";
class RootController {
  static async handleSuccessResponse(res: express.Response, data: any) {
    try {
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}

export default RootController;
