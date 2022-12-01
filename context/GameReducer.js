import {
  DRAW_PLAYER_STACK,
  PLAY_PLAYER_PLAYZONE,
  GET_PLAYERS_CARD,
  NEXT_PLAYER,
  SET_SOUND,
  NEW_SEQUENCE,
  OPEN_SELECTED_CARD_MODAL,
  SET_IA_COOP,
} from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case DRAW_PLAYER_STACK:
      return {
        ...state,
        [payload.currentPlayer]: payload.HandList,
        Stack: payload.stackList,
      };
    case PLAY_PLAYER_PLAYZONE:
      return {
        ...state,
        [payload.target]: payload.newPlayerHand,
        PlayZone: payload.newPlace,
      };
    case SET_IA_COOP:
      return {
        ...state,
        isIaTeam: payload,
      };
    case NEW_SEQUENCE:
      return {
        ...state,
        direction: payload.direction,
        turno: payload.newPlayer,
      };
    case NEXT_PLAYER:
      return {
        ...state,
        turno: payload.newPlayer,
      };
    case SET_SOUND:
      return {
        ...state,
        [payload.target]: payload.sonido,
      };
    case OPEN_SELECTED_CARD_MODAL:
      return {
        ...state,
        openSelectedCardModal: payload,
      };
    case GET_PLAYERS_CARD:
      return {
        ...state,
        playerHand: payload.playerHand,
        FobosBot: payload.FobosBot,
        DeimosBot: payload.DeimosBot,
        PlayZone: payload.firsPlayZone,
        Stack: payload.newStack,
      };
    default:
      return state;
  }
};
