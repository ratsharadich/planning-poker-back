import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  Default,
  PrimaryKey,
  BelongsToMany,
  BeforeSave,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import User from "./user-model";
import Card from "./card-model";
import UserRoom from "./associations/user-room";

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
    allowNull: false,
  })
  name!: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  showed!: boolean;

  @BelongsToMany(() => User, () => UserRoom)
  users!: User[];

  @HasMany(() => Card, { onDelete: "CASCADE" })
  cards!: Card[];
}

export default Room;
