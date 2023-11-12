import Card from "../models/card";
import Room from "../models/room";
import User from "../models/user";

interface IRoomRepo {
  create(room: Room, userIds: string[]): Promise<string>;
  update(room: Room, userIds: string[]): Promise<void>;
  delete(id: string): Promise<void>;
  retrieveById(id: string): Promise<Room>;
  retrieveAll(): Promise<Room[]>;
}

export class RoomRepo implements IRoomRepo {
  async create(room: Room, userIds: string[]): Promise<string> {
    const transaction = await Room.sequelize?.transaction();

    try {
      const newRoom = await Room.create({ name: room.name }, { transaction });
      await newRoom.$add("users", userIds, { transaction });
      await transaction?.commit();

      return newRoom.id;
    } catch (error) {
      await transaction?.rollback();
      throw new Error("Failed to create room!");
    }
  }

  async update(room: Room): Promise<void> {
    const transaction = await Room.sequelize?.transaction();

    try {
      const updatedRoom = await Room.findOne({
        where: { id: room.id },
      });

      if (!updatedRoom) {
        throw new Error("Room is not found!");
      }

      updatedRoom.name = room.name;
      await updatedRoom.save({ transaction });

      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();
      throw new Error("Failed to update room!");
    }
  }

  async delete(id: string): Promise<void> {
    const transaction = await Room.sequelize?.transaction();

    try {
      const roomToDelete = await Room.findOne({
        where: { id },
      });

      if (!roomToDelete) {
        throw new Error("Room is not found!");
      }

      // Delete associated cards
      await Card.destroy({
        where: { roomId: id },
        transaction,
      });

      await roomToDelete.destroy({ transaction });
      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();
      throw new Error("Failed to delete room!");
    }
  }

  async retrieveById(id: string): Promise<Room> {
    try {
      const newRoom = await Room.findOne({
        where: { id },
        include: [
          {
            model: User,
            include: [
              {
                model: Card,
              },
            ],
          },
        ],
      });

      if (!newRoom) {
        throw new Error("Room is not found!");
      }

      return newRoom;
    } catch (error) {
      throw new Error("Failed to retrieve room!");
    }
  }

  async retrieveAll(): Promise<Room[]> {
    try {
      return await Room.findAll();
    } catch (error) {
      throw new Error("Failed to retrieve all rooms!");
    }
  }
}
