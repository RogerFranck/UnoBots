import React, { useReducer } from 'react'
import GameReducer from './GameReducer'
import GameContext from './GameContext'
import { DRAW_PLAYER_STACK, PLAY_PLAYER_PLAYZONE, GET_PLAYERS_CARD, NEXT_PLAYER } from "./types";
import Deck from '../classes/deck';

const players = ['playerHand', 'DeimosBot', 'FobosBot'];

const GameState = ({ children }) => {

  const initialState = {
    playerHand: [{ number: '0', color: 'Red' }],
    FobosBot: [{ number: '0', color: 'Red' }],
    DeimosBot: [{ number: '0', color: 'Red' }],
    Stack: [{ number: '0', color: 'Red' }],
    PlayZone: [{ number: '0', color: 'Red' }],
    turno: 0,
  }

  const [state, dispatch] = useReducer(GameReducer, initialState)

  const NextPlayer = () => {
    const currentPlayer = state.turno
    let newPlayer = currentPlayer
    if (currentPlayer == 2) {
      newPlayer = 0
    } else {
      newPlayer = currentPlayer + 1
    }
    dispatch({
      type: NEXT_PLAYER,
      payload: {
        newPlayer,
      }
    })
  }

  const setUpGame = () => {
    const deck = new Deck();
    const {
      playerHand,
      FobosBot,
      DeimosBot
    } = drawHands(deck);
    dispatch({
      type: GET_PLAYERS_CARD,
      payload: {
        playerHand,
        FobosBot,
        DeimosBot,
        firsPlayZone: [deck.draw()],
        newStack: deck.cards,
      }
    })
  }

  const DrawPlayerCard = () => {
    const stackList = state.Stack
    const cardDraw = stackList.pop()

    dispatch({
      type: DRAW_PLAYER_STACK,
      payload: {
        HandList: [...state[players[state.turno]], cardDraw],
        stackList,
        currentPlayer: players[state.turno]
      }
    });

    NextPlayer();
  }

  const PlayPlayerCards = (card) => {
    if (state.turno != 0) {
      return;
    }
    if (card.color == state.PlayZone[state.PlayZone.length - 1].color
      || card.number == state.PlayZone[state.PlayZone.length - 1].number) {
      const newPlace = state.PlayZone
      const newPlayerHand = state.playerHand.filter((e) => e != card)
      newPlace.push(card)
      dispatch({
        type: PLAY_PLAYER_PLAYZONE,
        payload: {
          newPlayerHand,
          newPlace,
        }
      })
      NextPlayer()
    }
  }

  return (
    <GameContext.Provider value={{
      playerHand: state.playerHand,
      FobosBot: state.FobosBot,
      DeimosBot: state.DeimosBot,
      Stack: state.Stack,
      PlayZone: state.PlayZone,
      turno: state.turno,
      setUpGame,
      DrawPlayerCard,
      PlayPlayerCards,
    }} >
      {children}
    </GameContext.Provider>
  )

}

export default GameState;

const drawHands = (deck) => {
  const hands = {
    playerHand: [],
    FobosBot: [],
    DeimosBot: []
  };

  players.forEach((player) => {
    hands[player] = [0, 1, 2, 3, 4, 5, 6].map((value) => deck.draw());
  });
  
  return hands
};
