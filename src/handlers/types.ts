export enum ACTIONS {
  ADD_USER = "user:add",
  USER_LEAVE = "user:leave",
  GET_CARDS = "cards:get",
  GET_USERS = "users:get",
  UPDATE_CARD = "card:update",
}

export enum LISTENERS {
  LISTEN_USERS = "users",
  LISTEN_CARDS = "cards",
}

export type UserId = string;
export type UserName = string;
export type User = { userName: UserName; online: boolean };
export type UserList = Record<UserId, User>;

export type CardId = string;
export type CardValue = string | number;
export type Card = { userId: UserId; value: CardValue };
export type CardList = Record<CardId, { userId: UserId; value: CardValue }>;
export type CardsState = {
  showed: boolean;
  list: Record<CardId, { userId: UserId; value: CardValue }>;
};
