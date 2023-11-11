import { Request, Response } from "express";
import User from "../models/user";
import { UserRepo } from "../repository/user-repo";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const newUser = new User();
      newUser.name = req.body.name;

      const roomIds = req.body.roomIds; // Assuming you have a field called roomIds in the request
      const cardIds = req.body.cardIds; // Assuming you have a field called cardIds in the request

      await new UserRepo().create(newUser, roomIds, cardIds);

      res.status(201).json({
        status: "Created user!",
        message: "Successfully created user!",
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
      await new UserRepo().delete(id);

      res.status(200).json({
        status: "Deleted user!",
        message: "Successfully deleted user!",
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
      const users = await new UserRepo().retrieveAll();

      res.status(200).json({
        status: "Fetched all users!",
        message: "Successfully fetched all users!",
        data: users,
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
      const user = await new UserRepo().retrieveById(id);

      if (!user) {
        return res.status(404).json({
          status: "Not Found",
          message: "User not found",
        });
      }

      res.status(200).json({
        status: "Retrieved user!",
        message: "Successfully retrieved user by id!",
        data: user,
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
      const roomIds = req.body.roomIds; // Assuming you have a field called roomIds in the request
      const cardIds = req.body.cardIds; // Assuming you have a field called cardIds in the request

      const user = new User();
      user.id = id;
      user.name = req.body.name;

      await new UserRepo().update(user, roomIds, cardIds);

      res.status(201).json({
        status: "Updated user!",
        message: "Successfully updated user!",
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

export default new UserController();
