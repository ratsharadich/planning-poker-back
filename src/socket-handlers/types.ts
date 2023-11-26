export enum ACTIONS {
  GET_CARDS = "cards:get",
  GET_SHOW_STATE = "show-state:get",
  UPDATE_CARD = "card:update",
  TOGGLE_ROOM_SHOW_STATE = "room:show",
  CREATE_USER = "user:create",
  ADD_USER_TO_ROOM = "user:add-to-room",
  REMOVE_USER = "user:remove",
}

export enum LISTENERS {
  CARDS = "cards",
  SHOW_STATE = "show-state",
}
