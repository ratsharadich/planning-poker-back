import { Server, Socket } from "socket.io";

const cardRotate = { rotate: 0 };

export const cardHandlers = ({
  io,
  socket,
}: {
  io: Server;
  socket: Socket & { roomId: string };
}) => {
  const getCardRotate = () => {
    cardRotate.rotate += 45;
    io.in(socket.roomId).emit("card", cardRotate.rotate);
    console.log(cardRotate, "rotate");
  };

  socket.on("card:rotate", getCardRotate);
};
