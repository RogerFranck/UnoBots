import { DRAW_PLAYER_STACK, PLAY_PLAYER_PLAYZONE } from "./types";

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
    default:
      return state;
  }
};