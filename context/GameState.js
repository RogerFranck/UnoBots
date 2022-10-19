import React, { useReducer } from 'react'
import GameReducer from './GameReducer'
import GameContext from './GameContext'
import { DRAW_PLAYER_STACK, PLAY_PLAYER_PLAYZONE } from "./types";

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

  const getPlayerCards = () => { }

  const getFobosCards = () => { }

  const getDeimosCards = () => { }

  const getStackCards = () => { }

  const getPlayZoneCards = () => { }

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
      getPlayerCards,
      getFobosCards,
      getDeimosCards,
      getStackCards,
      getPlayZoneCards,
      DrawPlayerCard,
      PlayPlayerCards,
    }} >
      {children}
    </GameContext.Provider>
  )

}

export default GameState;
