import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  Default,
  PrimaryKey,
  BelongsToMany,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Room from "./room";
import Card from "./card";
import UserRoomAssociation from "./associations/user-room-association";

@Table({
  tableName: "users",
})
class User extends Model {
  @Default(uuidv4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @BelongsToMany(() => Room, () => UserRoomAssociation)
  rooms!: Room[];

  @HasMany(() => Card)
  cards!: Card[];
}

export default User;
