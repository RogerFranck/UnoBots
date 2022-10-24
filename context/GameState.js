import React, { useReducer } from 'react'
import GameReducer from './GameReducer'
import GameContext from './GameContext'
import {
  DRAW_PLAYER_STACK,
  PLAY_PLAYER_PLAYZONE,
  GET_PLAYERS_CARD,
  NEXT_PLAYER,
  SET_SOUND,
  NEW_SEQUENCE
} from "./types";
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
    sonidoPop: false,
    sonidoDraw: false,
    players: ['playerHand', 'DeimosBot', 'FobosBot'],
  }

  const [state, dispatch] = useReducer(GameReducer, initialState)

  const setEffectsSounds = (sonido, target) => {
    dispatch({
      type: SET_SOUND,
      payload: {
        sonido,
        target,
      }
    })
  }

  const NextPlayer = (skip) => {
    const currentPlayer = state.turno
    let newPlayer = currentPlayer
    if (currentPlayer >= 2) {
      newPlayer = 0
    } else {
      newPlayer = currentPlayer + 1
    }
    dispatch({
      type: NEXT_PLAYER,
      payload: {
        newPlayer: skip ? skip : newPlayer,
      }
    })
  }

  const skipPlayCard = () => { //? buegueado ?
    const currentPlayer = state.turno
    let newPlayer = currentPlayer
    if (currentPlayer == 0) {
      newPlayer = 2
    }
    if (currentPlayer == 1) {
      newPlayer = 0
    }
    if (currentPlayer == 2) {
      newPlayer = 1
    }
    return newPlayer
  }

  const reversePlayCard = () => { //! Bugueado
    //* funciona bien cuando lo juega un bot
    const sequence = state.players
    dispatch({
      type: NEW_SEQUENCE,
      payload: {
        newSequence: sequence.reverse()
      }
    });
  }

  const drawTwoPlayCard = () => { //* Aun no son stakeables
    const stackList = state.Stack
    const cardDraw = stackList.pop()
    const cardDraw2 = stackList.pop()
    const currentPlayer = state.turno
    let newPlayer = currentPlayer
    if (currentPlayer == 2) {
      newPlayer = 0
    } else {
      newPlayer = currentPlayer + 1
    }
    const handList = [...state[state.players[newPlayer]], cardDraw, cardDraw2]
    dispatch({
      type: DRAW_PLAYER_STACK,
      payload: {
        HandList: handList,
        stackList,
        currentPlayer: state.players[newPlayer]
      }
    });
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
        firsPlayZone: [deck.firstCardPlayZone()],
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
        HandList: [...state[state.players[state.turno]], cardDraw],
        stackList,
        currentPlayer: state.players[state.turno]
      }
    });
    NextPlayer();
    if (state.sonidoDraw) {
      state.sonidoDraw.play()
    }
  }

  const PlayPlayerCards = async (card, target) => {
    if (card.color == state.PlayZone[state.PlayZone.length - 1].color
      || card.number == state.PlayZone[state.PlayZone.length - 1].number) {

      let skip = false;

      switch (card.number) {
        case 'a':
          skip = skipPlayCard()
          break;
        case 'b':
          await reversePlayCard()
          break;
        case 'c':
          await drawTwoPlayCard()
          skip = skipPlayCard()
          break;
        default:
          break;
      }

      const newPlace = state.PlayZone
      const newPlayerHand = state[target].filter((e) => e != card)
      newPlace.push(card)

      dispatch({
        type: PLAY_PLAYER_PLAYZONE,
        payload: {
          newPlayerHand,
          target,
          newPlace,
        }
      })
      NextPlayer(skip)
      if (state.sonidoPop) { //! Bugueado
        state.sonidoPop.play()
      }
    }
  }

  return (
    <GameContext.Provider value={{
      playerHand: state.playerHand,
      FobosBot: state.FobosBot,
      DeimosBot: state.DeimosBot,
      Stack: state.Stack,
      PlayZoneData: state.PlayZone,
      turno: state.turno,
      players: state.players,
      setUpGame,
      DrawPlayerCard,
      PlayPlayerCards,
      setEffectsSounds,
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
