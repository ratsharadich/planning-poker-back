import Card from "../models/card";
import User from "../models/user";
import Room from "../models/room";

interface ICardRepo {
  create(card: {
    value: string;
    userId: string;
    roomId: string;
  }): Promise<void>;
  update(card: {
    id: string;
    value?: string;
    userId?: string;
    roomId?: string;
  }): Promise<void>;
  delete(id: string): Promise<void>;
  retrieveById(id: string): Promise<Card>;
  retrieveAll(): Promise<Card[]>;
}

export class CardRepo implements ICardRepo {
  async create({
    value,
    userId,
    roomId,
  }: {
    value: string;
    userId: string;
    roomId: string;
  }): Promise<void> {
    try {
      await Card.create({ value, userId, roomId });
    } catch (error) {
      throw new Error("Failed to create card!");
    }
  }

  async update({
    id,
    value,
    userId,
    roomId,
  }: {
    id: string;
    value?: string;
    userId?: string;
    roomId?: string;
  }): Promise<void> {
    try {
      const updatedCard = await Card.findOne({
        where: { id },
      });

      if (!updatedCard) {
        throw new Error("Card is not found!");
      }

      if (value) {
        updatedCard.value = value;
      }

      if (userId) {
        updatedCard.userId = userId;
      }

      if (roomId) {
        updatedCard.roomId = roomId;
      }

      await updatedCard.save();
    } catch (error) {
      throw new Error("Failed to update card!");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const cardToDelete = await Card.findOne({
        where: { id },
      });

      if (!cardToDelete) {
        throw new Error("Card is not found!");
      }

      await cardToDelete.destroy();
    } catch (error) {
      throw new Error("Failed to delete card!");
    }
  }

  async retrieveById(id: string): Promise<Card> {
    try {
      const newCard = await Card.findOne({
        where: { id },
        include: [
          {
            model: User,
          },
          {
            model: Room,
          },
        ],
      });

      if (!newCard) {
        throw new Error("Card is not found!");
      }

      return newCard;
    } catch (error) {
      throw new Error("Failed to retrieve card!");
    }
  }

  async retrieveAll(): Promise<Card[]> {
    try {
      return await Card.findAll();
    } catch (error) {
      throw new Error("Failed to retrieve all cards!");
    }
  }
}
