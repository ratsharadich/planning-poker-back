import { ACTIONS, CardValue, CardsState, UserId } from "./types";
import { Server, Socket } from "socket.io";

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
  const updateCard = ({
    userId,
    value,
  }: {
    userId: UserId;
    value: CardValue;
  }) => {
    cards.list[userId] = value;
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

  socket.on(ACTIONS.ADD_USER_TO_ROOM, getCards);
  socket.on(ACTIONS.REMOVE_USER, removeCard);
};
