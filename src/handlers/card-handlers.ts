import { ACTIONS, CardValue, CardsState, UserId } from "./types";
import { Server, Socket } from "socket.io";
import { users } from "./user-handlers";

const cards: CardsState = {
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
    userId: UserId;
    value: CardValue;
  }) => {
    cards.list[userId] = { userId, value };
    getCards();
  };

  const removeCard = ({ userId }: { userId: UserId }) => {
    if (cards.list[userId]) {
      delete cards.list[userId];
    }
  };

  socket.on(ACTIONS.GET_CARDS, getCards);
  socket.on(ACTIONS.UPDATE_CARD, updateCard);

  socket.on(ACTIONS.ADD_USER, getCards);
  socket.on(ACTIONS.USER_LEAVE, removeCard);
};
