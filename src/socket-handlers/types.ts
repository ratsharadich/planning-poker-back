export enum ACTIONS {
  GET_CARDS = "cards:get",
  UPDATE_CARD = "card:update",
  TOGGLE_ROOM_SHOW_STATE = "room:show",
}

export enum LISTENERS {
  CARDS = "cards",
  SHOW_STATE = "show-state",
}

export type UserId = string;
export type UserName = string;
export type User = { userName: UserName; online: boolean };
export type UserList = Record<UserId, User>;

export type CardValue = string | number;
export type CardList = Record<UserId, CardValue>;
export type CardsState = {
  shown: boolean;
  list: CardList;
};
