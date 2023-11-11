import { Request, Response } from "express";
import Card from "../models/card";
import { CardRepo } from "../repository/card-repo";

class CardController {
  async create(req: Request, res: Response) {
    try {
      const newCard = new Card();
      newCard.value = req.body.value;
      newCard.userId = req.body.userId;
      newCard.roomId = req.body.roomId;

      await new CardRepo().create(newCard);

      res.status(201).json({
        status: "Created card!",
        message: "Successfully created card!",
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
      await new CardRepo().delete(id);

      res.status(200).json({
        status: "Deleted card!",
        message: "Successfully deleted card!",
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
      const cards = await new CardRepo().retrieveAll();

      res.status(200).json({
        status: "Fetched all cards!",
        message: "Successfully fetched all cards!",
        data: cards,
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
      const card = await new CardRepo().retrieveById(id);

      if (!card) {
        return res.status(404).json({
          status: "Not Found",
          message: "Card not found",
        });
      }

      res.status(200).json({
        status: "Retrieved card!",
        message: "Successfully retrieved card by id!",
        data: card,
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
      const updatedCard = {
        id,
        value: req.body.value,
        userId: req.body.userId,
        roomId: req.body.roomId,
      };

      await new CardRepo().update(updatedCard);

      res.status(201).json({
        status: "Updated card!",
        message: "Successfully updated card!",
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

export default new CardController();
