import {
  DRAW_PLAYER_STACK,
  PLAY_PLAYER_PLAYZONE,
  GET_PLAYERS_CARD,
  NEXT_PLAYER
} from "./types";

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
    case NEXT_PLAYER:
      return {
        ...state,
        turno: payload.newPlayer,
      };
    case GET_PLAYERS_CARD:
      return {
        ...state,
        playerHand: payload.newPlayerHand,
        FobosBot: payload.newFobosHand,
        DeimosBot: payload.newDeimosHand,
        PlayZone: payload.firsPlayZone,
        Stack: payload.newStack,
      };
    default:
      return state;
  }
};