import { Server, Socket } from "socket.io";
import { users } from "./user-handlers";

const cards: {
  showed: boolean;
  list: Record<string, { userId: string; value: string | number }>;
} = {
  showed: false,
  list: {},
};

export const cardHandlers = ({
  io,
  socket,
}: {
  io: Server;
  socket: Socket & { roomId: string };
}) => {
  const getCards = () => {
    for (let userId in users) {
      if (!cards.list[userId]) {
        cards.list[userId] = { userId, value: "" };
      }
    }

    io.in(socket.roomId).emit("cards", cards);
  };

  const updateCard = ({
    userId,
    value,
  }: {
    userId: string;
    value: string | number;
  }) => {
    cards.list[userId] = { userId, value };
    getCards();
  };

  const removeCard = ({ userId }: { userId: string }) => {
    if (cards.list[userId]) {
      delete cards.list[userId];
    }
  };

  socket.on("cards:get", getCards);
  socket.on("card:update", updateCard);

  socket.on("user:add", getCards);
  socket.on("user:leave", removeCard);
};
