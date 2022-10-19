import { DRAW_PLAYER_STACK, PLAY_PLAYER_PLAYZONE, GET_PLAYERS_CARD } from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case DRAW_PLAYER_STACK:
      return {
        ...state,
        playerHand: payload.playerHandList,
        Stack: payload.stackList,
      };
    case PLAY_PLAYER_PLAYZONE:
      return {
        ...state,
        playerHand: payload.newPlayerHand,
        PlayZone: payload.newPlace,
      };
    case GET_PLAYERS_CARD:
      return {
        ...state,
        playerHand: payload.newPlayerHand,
        FobosBot: payload.newFobosHand,
        FobosBot: payload.newDeimosHand,
        PlayZone: payload.firsPlayZone,
        Stack: payload.newStack
      };
    default:
      return state;
  }
};