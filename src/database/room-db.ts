import Card from "../models/card-model";
import Room from "../models/room-model";
import User from "../models/user-model";
import { UserDb } from "./user-db";

/* Room database operations */
export class RoomDb {
  /**
   * room creation:
   * 1. create room by room name
   * 2. create card by room name and user id
   * 3. associate new room with passed user id
   * @param {string} roomName - room name to create
   * @param {string} userId - id of frist user in the room
   * @returns {Promise<string>} - new room id as result of the promise
   */
  static async create(roomName: string, userId: string): Promise<string> {
    const transaction = await Room.sequelize?.transaction();

    try {
      const newRoom = await Room.create({ name: roomName }, { transaction });

      await Card.create(
        {
          userId,
          roomId: newRoom.id,
          value: "",
        },
        { transaction }
      );

      await newRoom.$add("users", userId, { transaction });
      await transaction?.commit();

      return newRoom.id;
    } catch (error) {
      await transaction?.rollback();

      if (error instanceof Error) {
        console.error(error.message.red);
      }
      throw new Error("Failed to create room!");
    }
  }

  /**
   * room updating:
   * 1. find room by id
   * 2. find user by id (or assign it to undefined)
   * 3. if there is need to update room name - assign no name to gotten room by id
   * 4. save room changes
   * 5. if user id is passed: if there is user in room associations - remove it, if there isn't - add it and create new card for this user and current room
   * @param {string} obj.roomId - id of room to update
   * @param {string} obj.roomName - name of room to update
   * @param {string} [obj.userId] - optional user id
   * @returns {Promise<void>}
   */
  static async update({
    roomId,
    roomName,
    userId,
  }: {
    roomId: string;
    roomName?: string;
    userId?: string;
  }): Promise<void> {
    const transaction = await Room.sequelize?.transaction();

    try {
      const room = await RoomDb.findById(roomId);
      const user = userId ? await UserDb.findById(userId) : undefined;

      if (roomName) {
        room.name = roomName;
      }

      await room.save({ transaction });

      if (user) {
        await room.$add("users", user.id, { transaction });
        await Card.create(
          {
            userId: user.id,
            roomId: room.id,
            value: "",
          },
          { transaction }
        );
      }

      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();

      if (error instanceof Error) {
        console.error(error.message.red);
      }
      throw new Error("Failed to update room!");
    }
  }

  /**
   * room getting:
   * @param {string} id - id of room to find
   * @returns {Promise<Room>} - found user
   */
  static async findById(id: string): Promise<Room> {
    try {
      const newRoom = await Room.findOne({
        where: { id },
        include: [
          {
            model: User,
            through: {
              attributes: [],
            },
            include: [
              {
                model: Card,
                where: {
                  roomId: id,
                },
              },
            ],
          },
        ],
      });

      if (!newRoom) {
        throw new Error("Room is not found!");
      }

      return newRoom;
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(error);
    }
  }

  /**
   * toggle cards showing
   * @param {string} id - room id
   * @returns {Promise<boolean>}
   */
  static async toggleRoomShowState(id: string): Promise<void> {
    const transaction = await Room.sequelize?.transaction();
    try {
      const room = await Room.findOne({ where: { id } });

      if (room) {
        room.showed = !room.showed;
        await room?.save({ transaction });
      }

      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();
      throw new Error("Failed to toggle room cards showing state!");
    }
  }

  /**
   * room deleting
   * @param {string} id - id of room to delete
   * @returns {Promise<void>}
   */
  static async delete(id: string): Promise<void> {
    const transaction = await Room.sequelize?.transaction();
    try {
      await Room.destroy({ where: { id }, transaction });
      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();
      throw new Error("Failed to delete room!");
    }
  }
}
