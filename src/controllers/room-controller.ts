import { Request, Response } from "express";
import { RoomDb } from "../database/room-db";

class RoomController {
  async create(req: Request, res: Response) {
    try {
      const userId = req.body.userId;

      const roomId = await RoomDb.create(req.body.name, userId);

      res.status(201).json({
        status: "Created room!",
        message: "Successfully create room!",
        data: roomId,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message.red);
      }
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const roomId = req.params.id;
      const roomName = req.body.name;
      const userId = req.body.userId;

      await RoomDb.update({ roomId, roomName, userId });

      res.status(200).json({
        status: "Updated room!",
        message: "Successfully updated room!",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message.red);
      }
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const room = await RoomDb.findById(id);

      if (!room) {
        return res.status(404).json({
          status: "Not Found",
          message: "Room not found",
        });
      }

      res.status(200).json({
        status: "Retrieved room!",
        message: "Successfully retrieved room by id!",
        data: room,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message.red);
      }
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await RoomDb.delete(id);

      res.status(200).json({
        status: "Deleted room!",
        message: "Successfully deleted room!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new RoomController();
