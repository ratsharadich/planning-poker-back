export enum ACTIONS {
  ADD_USER = "user:add",
  USER_LEAVE = "user:leave",
  GET_CARDS = "cards:get",
  GET_USERS = "users:get",
  UPDATE_CARD = "card:update",
  SHOW_CARDS = "cards:set-shown",
}

export enum LISTENERS {
  LISTEN_USERS = "users",
  LISTEN_CARDS = "cards",
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
