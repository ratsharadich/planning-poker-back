import { Server, Socket } from "socket.io";

export const users: Record<string, { userName: string; online: boolean }> = {};

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
    userName: string;
    userId: string;
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

  socket.on("users:get", getUsers);
  socket.on("user:add", addUser);
  socket.on("user:leave", removeUser);
};
