import Card from "../models/card-model";

export class CardDb {
  static async update({
    id,
    value,
  }: {
    id: string;
    value?: string;
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

      await updatedCard.save();
    } catch (error) {
      throw new Error("Failed to update card!");
    }
  }

  static async findByRoomAndUserId(
    roomId: string,
    userId: string
  ): Promise<Card> {
    try {
      const newCard = await Card.findOne({
        where: { roomId, userId },
      });

      if (!newCard) {
        throw new Error("Card is not found!");
      }

      return newCard;
    } catch (error) {
      throw new Error("Failed to retrieve card!");
    }
  }
}
