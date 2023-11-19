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
import Room from "./room-model";
import Card from "./card-model";
import UserRoom from "./associations/user-room";

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

  @BelongsToMany(() => Room, () => UserRoom)
  rooms!: Room[];

  @HasMany(() => Card, { onDelete: "CASCADE" })
  cards!: Card[];
}

export default User;
