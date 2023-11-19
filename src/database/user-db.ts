import Card from "../models/card-model";
import Room from "../models/room-model";
import User from "../models/user-model";

export class UserDb {
  /**
   * user creating
   * @param {string} userName - name of user to create
   * @returns {Promise<string>} - promise with id of new user
   */
  static async create(userName: string): Promise<string> {
    try {
      const newUser = await User.create({ name: userName });
      return newUser.id;
    } catch (error) {
      throw new Error("Failed to create user!");
    }
  }

  /**
   * user updating
   * @param {string} userId - id of user to update
   * @param {string} userName - new name for user
   * @returns {Promise<void>}
   */
  static async update(userId: string, userName: string): Promise<void> {
    const transaction = await User.sequelize?.transaction();

    try {
      const user = await User.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User is not found!");
      }

      user.name = userName;
      await user.save({ transaction });

      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();
      throw new Error("Failed to update user!");
    }
  }

  /**
   * user getting by id
   * @param {string} id - id of user to find
   * @returns {Promise<User>} - found user
   */
  static async findById(id: string): Promise<User> {
    try {
      const newUser = await User.findOne({
        where: { id },
        include: [
          {
            model: Room,
            through: {
              attributes: [],
            },
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

  /**
   * user getting by id
   * @param {string} roomId - id of room to find users by
   * @returns {Promise<User[]>} - found users
   */
  static async findAllByRoomId(roomId: string): Promise<User[]> {
    try {
      const users = await User.findAll({
        where: { roomId },
        include: [
          {
            model: Card,
          },
        ],
      });

      return users;
    } catch (error) {
      throw new Error("Failed to retrieve user!");
    }
  }

  /**
   * user deleting
   * @param {string} id - id of user to delete
   * @returns {Promise<void>}
   */
  static async delete(id: string): Promise<void> {
    const transaction = await User.sequelize?.transaction();
    try {
      await User.destroy({ where: { id }, transaction });
      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();
      throw new Error("Failed to delete user!");
    }
  }
}
