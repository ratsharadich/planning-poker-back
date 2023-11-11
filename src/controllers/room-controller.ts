import { Request, Response } from "express";
import Room from "../models/room";
import { RoomRepo } from "../repository/room-repo";

class RoomController {
  async create(req: Request, res: Response) {
    try {
      const newRoom = new Room();
      newRoom.name = req.body.name;

      await new RoomRepo().create(newRoom);

      res.status(201).json({
        status: "Created room!",
        message: "Successfully create room!",
      });
    } catch (error) {
      res.status(500).json({
        status: "Internval Server Error!",
        message: "Internval Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await new RoomRepo().delete(id);

      res.status(200).json({
        status: "Deleted room!",
        message: "Successfully deleted room!",
      });
    } catch (error) {
      res.status(500).json({
        status: "Internval Server Error!",
        message: "Internval Server Error!",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const notes = new RoomRepo().retrieveAll();

      res.status(200).json({
        status: "Fetched all rooms!",
        message: "Successfully fetched all room!",
        data: notes,
      });
    } catch (error) {
      res.status(500).json({
        status: "Internval Server Error!",
        message: "Internval Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const room = new RoomRepo().retrieveById(id);

      res.status(200).json({
        status: "Retrieved room!",
        message: "Successfully retrieved room by id!",
        data: room,
      });
    } catch (error) {
      res.status(500).json({
        status: "Internval Server Error!",
        message: "Internval Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const room = new Room();

      room.id = id;
      room.name = req.body.name;

      await new RoomRepo().update(room);

      res.status(201).json({
        status: "Updated room!",
        message: "Successfully updated room!",
      });
    } catch (error) {
      res.status(500).json({
        status: "Internval Server Error!",
        message: "Internval Server Error!",
      });
    }
  }
}

export default new RoomController();
