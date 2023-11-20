import Card from "../models/card-model";

export class CardDb {
  static async update({
    id,
    value,
  }: {
    id: string;
    value: string;
  }): Promise<void> {
    try {
      const updatedCard = await Card.findOne({
        where: { id },
      });

      if (!updatedCard) {
        throw new Error("Card is not found!");
      }

      updatedCard.value = value;

      await updatedCard.save();
    } catch (error) {
      throw new Error("Failed to update card!");
    }
  }

  static async findAllByRoom(roomId: string): Promise<Card[]> {
    try {
      const cards = await Card.findAll({
        where: { roomId },
      });

      if (!cards) {
        throw new Error("Card is not found!");
      }

      return cards;
    } catch (error) {
      throw new Error("Failed to retrieve card!");
    }
  }

  static async finById(id: string): Promise<Card> {
    try {
      const card = await Card.findOne({
        where: { id },
      });

      if (!card) {
        throw new Error("Card is not found!");
      }

      return card;
    } catch (error) {
      throw new Error("Failed to retrieve card!");
    }
  }
}
