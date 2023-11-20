import { Server, Socket } from "socket.io";
import { ACTIONS, LISTENERS } from "./types";
import { RoomDb } from "../database/room-db";
import { UserDb } from "../database/user-db";
import { CardDb } from "../database/card-db";

export const handlers = ({
  io,
  socket,
}: {
  io: Server;
  socket: Socket & { roomId: string };
}) => {
  const getCardsByRoom = async () => {
    const cards = await CardDb.findAllByRoom(socket.roomId);
    io.in(socket.roomId).emit(LISTENERS.CARDS, cards);
  };

  const updateCard = async ({
    cardId,
    value,
  }: {
    cardId: string;
    value: string;
  }) => {
    await CardDb.update({ id: cardId, value });
    getCardsByRoom();
  };

  const getRoomShowState = async () => {
    const room = await RoomDb.findById(socket.roomId);
    io.in(socket.roomId).emit(LISTENERS.SHOW_STATE, room.showed);
  };

  const toggleRoomShowState = async () => {
    await RoomDb.toggleRoomShowState(socket.roomId);
    getRoomShowState();
  };

  socket.on(ACTIONS.GET_CARDS, getCardsByRoom);
  socket.on(ACTIONS.UPDATE_CARD, updateCard);
  socket.on(ACTIONS.TOGGLE_ROOM_SHOW_STATE, toggleRoomShowState);
};
