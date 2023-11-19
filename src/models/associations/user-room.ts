import { Table, Model, Column, ForeignKey } from "sequelize-typescript";
import User from "../user-model";
import Room from "../room-model";

@Table({
  tableName: "userRoom",
})
class UserRoom extends Model {
  @ForeignKey(() => User)
  @Column
  userId!: string;

  @ForeignKey(() => Room)
  @Column
  roomId!: string;
}

export default UserRoom;
