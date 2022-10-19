import React, { useReducer } from 'react'
import GameReducer from './GameReducer'
import GameContext from './GameContext'
import { DRAW_PLAYER_STACK, PLAY_PLAYER_PLAYZONE, GET_PLAYERS_CARD, NEXT_PLAYER } from "./types";
import { content } from '../constants/content'

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
    const randomDek = content.sort(function () { return Math.random() - 0.5 })
    const newPlayerHand = randomDek.slice(0, 7)
    const newFobosHand = randomDek.slice(7, 14)
    const newDeimosHand = randomDek.slice(14, 21)
    const firsPlayZone = randomDek.slice(21, 22)
    const newStack = randomDek.slice(22, randomDek.length + 1)
    dispatch({
      type: GET_PLAYERS_CARD,
      payload: {
        newPlayerHand,
        newFobosHand,
        newDeimosHand,
        firsPlayZone,
        newStack,
      }
    })
  }

  const DrawPlayerCard = () => {
    const stackList = state.Stack
    const cardDraw = stackList.pop()
    let HandList = state.playerHand
    if (state.turno == 0) {
      HandList = state.playerHand
    }
    if (state.turno == 1) {
      HandList = state.DeimosBot
    }
    if (state.turno == 2) {
      HandList = state.FobosBot
    }
    HandList.push(cardDraw) //! Como puedo mandarlo a la mano correcta?
    dispatch({
      type: DRAW_PLAYER_STACK,
      payload: {
        HandList,
        stackList,
      }
    })
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
