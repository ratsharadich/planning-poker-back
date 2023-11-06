import { Request, Response, NextFunction } from "express";
import { activeSessions } from "../..";

class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const roomId = req.query.roomId;

      console.log("  ");
      console.log("  ");
      console.log(roomId, "roomId");
      console.log("  ");
      console.log("  ");

      if (typeof roomId === "string") {
        const result = activeSessions.get(roomId);

        if (!result) return res.status(404).json({ message: "Room Not Found" });

        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
