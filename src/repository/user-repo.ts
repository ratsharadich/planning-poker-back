import Card from "../models/card";
import Room from "../models/room";
import User from "../models/user";

interface IUserRepo {
  create(user: User, roomIds: string[], cardIds: string[]): Promise<string>;
  update(user: User, roomIds: string[], cardIds: string[]): Promise<void>;
  delete(id: string): Promise<void>;
  retrieveById(id: string): Promise<User>;
  retrieveAll(): Promise<User[]>;
}

export class UserRepo implements IUserRepo {
  async create(user: User): Promise<string> {
    try {
      const newUser = await User.create({ name: user.name });
      return newUser.id;
    } catch (error) {
      throw new Error("Failed to create user!");
    }
  }

  async update(user: User): Promise<void> {
    const transaction = await User.sequelize?.transaction();

    try {
      const updatedUser = await User.findOne({
        where: { id: user.id },
      });

      if (!updatedUser) {
        throw new Error("User is not found!");
      }

      updatedUser.name = user.name;
      await updatedUser.save({ transaction });
      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();
      throw new Error("Failed to update user!");
    }
  }

  async delete(id: string): Promise<void> {
    const transaction = await User.sequelize?.transaction();

    try {
      const userToDelete = await User.findOne({
        where: { id },
      });

      if (!userToDelete) {
        throw new Error("User is not found!");
      }

      // Delete associated cards
      await Card.destroy({
        where: { userId: id },
        transaction,
      });

      await userToDelete.destroy({ transaction });
      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();
      throw new Error("Failed to delete user!");
    }
  }

  async retrieveById(id: string): Promise<User> {
    try {
      const newUser = await User.findOne({
        where: { id },
        include: [
          {
            model: Room,
            include: [
              {
                model: Card,
              },
            ],
          },
        ],
      });

      if (!newUser) {
        throw new Error("User is not found!");
      }

      return newUser;
    } catch (error) {
      throw new Error("Failed to retrieve user!");
    }
  }

  async retrieveAll(): Promise<User[]> {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error("Failed to retrieve all users!");
    }
  }
}
