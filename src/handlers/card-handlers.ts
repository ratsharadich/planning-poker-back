import { ACTIONS, CardValue, CardsState, UserId } from "./types";
import { Server, Socket } from "socket.io";
import { users } from "./user-handlers";

const cards: CardsState = {
  shown: false,
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
        cards.list[userId] = "";
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
    if (cards.list[userId] === value) {
      cards.list[userId] = "";
    } else {
      cards.list[userId] = value;
    }

    getCards();
  };

  const setCardsShown = ({ show }: { show: boolean }) => {
    cards.shown = show;
    getCards();
  };

  const removeCard = ({ userId }: { userId: UserId }) => {
    if (cards.list[userId]) {
      delete cards.list[userId];
    }
  };

  socket.on(ACTIONS.GET_CARDS, getCards);
  socket.on(ACTIONS.UPDATE_CARD, updateCard);
  socket.on(ACTIONS.SHOW_CARDS, setCardsShown);

  socket.on(ACTIONS.ADD_USER, getCards);
  socket.on(ACTIONS.USER_LEAVE, removeCard);
};
