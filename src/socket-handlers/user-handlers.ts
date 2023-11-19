import { Server, Socket } from "socket.io";
import { ACTIONS } from "./types";
import { RoomDb } from "../database/room-db";
import { UserDb } from "../database/user-db";

export const userHandlers = ({
  io,
  socket,
}: {
  io: Server;
  socket: Socket & { roomId: string };
}) => {
  const getUsersByRoom = async () => {
    const users = await UserDb.findAllByRoomId(socket.roomId);
    io.in(socket.roomId).emit("users", users);
  };

  const addUserToRoom = async ({ userId }: { userId: string }) => {
    await RoomDb.update({ roomId: socket.roomId, userId });
    getUsersByRoom();
  };

  const removeUser = async ({ userId }: { userId: string }) => {
    await UserDb.delete(userId);
    getUsersByRoom();
  };

  socket.on(ACTIONS.GET_USERS, getUsersByRoom);
  socket.on(ACTIONS.ADD_USER_TO_ROOM, addUserToRoom);
  socket.on(ACTIONS.REMOVE_USER, removeUser);
};
