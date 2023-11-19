import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  Default,
  PrimaryKey,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import User from "./user-model";
import Room from "./room-model";

@Table({
  tableName: "cards",
})
class Card extends Model {
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
  value!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  roomId!: string;

  @BelongsTo(() => Room)
  room!: Room;
}

export default Card;
