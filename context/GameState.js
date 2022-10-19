import React, { useReducer } from 'react'
import GameReducer from './GameReducer'
import GameContext from './GameContext'
import { DRAW_PLAYER_STACK, PLAY_PLAYER_PLAYZONE, GET_PLAYERS_CARD } from "./types";
import { content } from '../constants/content'

const GameState = ({ children }) => {

  const initialState = {
    playerHand: [
      { number: '2', color: 'Red' },
      { number: '7', color: 'Blue' },
      { number: '9', color: 'Yellow' },
      { number: '4', color: 'Green' },
      { number: '3', color: 'Red' },
      { number: '0', color: 'Yellow' },
      { number: '2', color: 'Green' },
    ],
    FobosBot: [
      { number: '2', color: 'Red' },
      { number: '7', color: 'Blue' },
      { number: '9', color: 'Yellow' },
      { number: '4', color: 'Green' },
      { number: '3', color: 'Red' },
      { number: '0', color: 'Yellow' },
      { number: '2', color: 'Green' },
    ],
    DeimosBot: [
      { number: '2', color: 'Red' },
      { number: '7', color: 'Blue' },
      { number: '9', color: 'Yellow' },
      { number: '4', color: 'Green' },
      { number: '3', color: 'Red' },
      { number: '0', color: 'Yellow' },
      { number: '2', color: 'Green' },
    ],
    Stack: [
      { number: '2', color: 'Red' },
      { number: '7', color: 'Blue' },
      { number: '9', color: 'Yellow' },
      { number: '4', color: 'Green' },
      { number: '3', color: 'Red' },
      { number: '0', color: 'Yellow' },
      { number: '2', color: 'Green' },
    ],
    PlayZone: [
      { number: '8', color: 'Green' }
    ],
  }

  const [state, dispatch] = useReducer(GameReducer, initialState)

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
    const playerHandList = state.playerHand
    playerHandList.push(cardDraw)
    dispatch({
      type: DRAW_PLAYER_STACK,
      payload: {
        playerHandList,
        stackList,
      }
    })
  }

  const PlayPlayerCards = (card) => {
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
    }
  }

  return (
    <GameContext.Provider value={{
      playerHand: state.playerHand,
      FobosBot: state.FobosBot,
      DeimosBot: state.DeimosBot,
      Stack: state.Stack,
      PlayZone: state.PlayZone,
      setUpGame,
      DrawPlayerCard,
      PlayPlayerCards,
    }} >
      {children}
    </GameContext.Provider>
  )

}

export default GameState;
