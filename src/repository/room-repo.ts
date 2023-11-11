import Room from "../models/room";

interface IRoomRepo {
  create(room: Room): Promise<void>;
  update(room: Room): Promise<void>;
  delete(id: number): Promise<void>;
  retrieveById(id: number): Promise<Room>;
  retrieveAll(id: number): Promise<Room[]>;
}

export class RoomRepo implements IRoomRepo {
  async create(room: Room): Promise<void> {
    try {
      await Room.create({ name: room.name });
    } catch (error) {
      throw new Error("Failed to create room!");
    }
  }

  async update(room: Room): Promise<void> {
    try {
      const newRoom = await Room.findOne({
        where: {
          id: room.id,
        },
      });

      if (!newRoom) {
        throw new Error("Room is not found!");
      }

      newRoom.name = room.name;
      await newRoom.save();
    } catch (error) {
      throw new Error("Failed to update room!");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const newRoom = await Room.findOne({
        where: {
          id,
        },
      });

      if (!newRoom) {
        throw new Error("Room is not found!");
      }

      await newRoom.destroy();
    } catch (error) {
      throw new Error("Failed to create room!");
    }
  }

  async retrieveById(id: number): Promise<Room> {
    try {
      const newRoom = await Room.findOne({
        where: {
          id,
        },
      });

      if (!newRoom) {
        throw new Error("Room is not found!");
      }

      return newRoom;
    } catch (error) {
      throw new Error("Failed to create room!");
    }
  }

  async retrieveAll(): Promise<Room[]> {
    try {
      return await Room.findAll();
    } catch (error) {
      throw new Error("Failed to create room!");
    }
  }
}
