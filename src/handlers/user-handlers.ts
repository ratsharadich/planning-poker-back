import { Server, Socket } from "socket.io";
import { ACTIONS, UserId, UserList, UserName } from "./types";

export const users: UserList = {};

export const userHandlers = ({
  io,
  socket,
}: {
  io: Server;
  socket: Socket & { roomId: string };
}) => {
  const getUsers = () => {
    io.in(socket.roomId).emit("users", users);
  };

  const addUser = ({
    userName,
    userId,
  }: {
    userName: UserName;
    userId: UserId;
  }) => {
    if (!users[userId]) {
      users[userId] = { userName, online: true };
    } else {
      users[userId].online = true;
    }

    getUsers();
  };

  const removeUser = ({ userId }: { userId: string }) => {
    users[userId].online = false;
    getUsers();
  };

  socket.on(ACTIONS.GET_USERS, getUsers);
  socket.on(ACTIONS.ADD_USER, addUser);
  socket.on(ACTIONS.USER_LEAVE, removeUser);
};
