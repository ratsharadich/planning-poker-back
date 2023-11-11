import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "room",
})
class Room extends Model {
  public static ROOM_TABLE_NAME = "room";
  public static ROOM_ID = "id";
  public static ROOM_NAME = "name";

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Room.ROOM_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: Room.ROOM_NAME,
  })
  name!: string;
}

export default Room;
