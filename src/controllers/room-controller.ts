import { Request, Response } from "express";
import Room from "../models/room";
import { RoomRepo } from "../repository/room-repo";

class RoomController {
  async create(req: Request, res: Response) {
    try {
      const newRoom = new Room();
      newRoom.name = req.body.name;

      await new RoomRepo().create(newRoom, []);

      res.status(201).json({
        status: "Created room!",
        message: "Successfully create room!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await new RoomRepo().delete(id);

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

  async findAll(req: Request, res: Response) {
    try {
      const rooms = await new RoomRepo().retrieveAll();

      res.status(200).json({
        status: "Fetched all rooms!",
        message: "Successfully fetched all rooms!",
        data: rooms,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const room = await new RoomRepo().retrieveById(id);

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
      console.error(error);
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userIds = req.body.userids;
      const room = new Room();

      room.id = id;
      room.name = req.body.name;

      await new RoomRepo().update(room, userIds);

      res.status(201).json({
        status: "Updated room!",
        message: "Successfully updated room!",
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