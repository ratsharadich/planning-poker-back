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
import User from "./user";
import Card from "./card";
import UserRoomAssociation from "./associations/user-room-association";

@Table({
  tableName: "rooms",
})
class Room extends Model {
  @Default(uuidv4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @BelongsToMany(() => User, () => UserRoomAssociation)
  users!: User[];

  @HasMany(() => Card)
  cards!: Card[];
}

export default Room;