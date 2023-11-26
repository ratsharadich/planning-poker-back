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
  // get

  const getCards = async () => {
    const cards = await CardDb.findAllByRoom(socket.roomId);
    io.in(socket.roomId).emit(LISTENERS.CARDS, cards);
  };

  const getRoomShowState = async () => {
    const room = await RoomDb.findById(socket.roomId);
    io.in(socket.roomId).emit(LISTENERS.SHOW_STATE, room.showed);
  };

  // patch
  const updateCard = async ({
    cardId,
    value,
  }: {
    cardId: string;
    value: string;
  }) => {
    await CardDb.update({ id: cardId, value });
    getCards();
  };

  const addUserToRoom = async ({ userId }: { userId: string }) => {
    await RoomDb.update({ roomId: socket.roomId, userId });
    getCards();
  };

  const toggleRoomShowState = async () => {
    await RoomDb.toggleRoomShowState(socket.roomId);
    getRoomShowState();
  };

  //delete
  const removeUser = async ({ userId }: { userId: string }) => {
    await UserDb.delete(userId);
    getCards();
  };

  socket.on(ACTIONS.GET_CARDS, getCards);
  socket.on(ACTIONS.GET_SHOW_STATE, getRoomShowState);
  socket.on(ACTIONS.UPDATE_CARD, updateCard);
  socket.on(ACTIONS.ADD_USER_TO_ROOM, addUserToRoom);
  socket.on(ACTIONS.TOGGLE_ROOM_SHOW_STATE, toggleRoomShowState);
  socket.on(ACTIONS.REMOVE_USER, removeUser);
};
