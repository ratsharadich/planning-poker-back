import { Request, Response } from "express";
import User from "../models/user-model";
import { UserDb } from "../database/user-db";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const userName = req.body.name;

      if (!userName) {
        throw new Error("User name is necessary to create a user!");
      }

      const id = await UserDb.create(userName);

      res.status(201).json({
        status: "Created user!",
        message: "Successfully created user!",
        data: id,
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
      const user = await UserDb.findById(id);

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
      const userId = req.params.id;
      const userName = req.body.name;

      await UserDb.update(userId, userName);

      res.status(200).json({
        status: "Updated user!",
        message: "Successfully updated user!",
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
      await UserDb.delete(id);

      res.status(200).json({
        status: "Deleted user!",
        message: "Successfully deleted user!",
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
}

export default new UserController();
