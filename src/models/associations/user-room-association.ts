import { Table, Model, Column, ForeignKey } from "sequelize-typescript";
import User from "../user";
import Room from "../room";

@Table({
  tableName: "userRoomAssociations",
})
class UserRoomAssociation extends Model {
  @ForeignKey(() => User)
  @Column
  userId!: string;

  @ForeignKey(() => Room)
  @Column
  roomId!: string;
}

export default UserRoomAssociation;
