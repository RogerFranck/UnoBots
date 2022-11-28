import React, { useReducer } from 'react'
import GameReducer from './GameReducer'
import GameContext from './GameContext'
import {
  DRAW_PLAYER_STACK,
  PLAY_PLAYER_PLAYZONE,
  GET_PLAYERS_CARD,
  NEXT_PLAYER,
  SET_SOUND,
  NEW_SEQUENCE,
  OPEN_SELECTED_CARD_MODAL
} from "./types";
import Deck from '../classes/deck';

const players = ['playerHand', 'DeimosBot', 'FobosBot'];

const GameState = ({ children }) => {

  const initialState = { //* Estado inicial del juego
    playerHand: [{ number: '0', color: 'Red' }],
    FobosBot: [{ number: '0', color: 'Red' }],
    DeimosBot: [{ number: '0', color: 'Red' }],
    Stack: [{ number: '0', color: 'Red' }],
    PlayZone: [{ number: '0', color: 'Red' }],
    turno: 0,
    sonidoPop: false,
    sonidoDraw: false,
    players: ['playerHand', 'DeimosBot', 'FobosBot'],
    direction: 1,
    openSelectedCardModal: false,
    logsArr: []
  }

  const [state, dispatch] = useReducer(GameReducer, initialState)

  const OpenSelectedCardModal = (value) => { //* Controlador para abrir modal de selección de color [para humanos]
    dispatch({
      type: OPEN_SELECTED_CARD_MODAL,
      payload: value
    })
  }

  const setEffectsSounds = (sonido, target) => { //* Controlador de carga de sonidos
    dispatch({
      type: SET_SOUND,
      payload: {
        sonido,
        target,
      }
    })
  }

  const NextPlayer = (skip) => { //* determina el siguiente jugador, si recibe skip es por que se proceso en otro lugar el nuevo jugador
    let newPlayer = state.turno + state.direction; //* direction es '1' o '-1' y funciona para conocer la sequeincia del juego
    if (newPlayer > 2) { //* los jugadores son 0:Humano, 1:Deimos, 2:Fobos, siempre
      newPlayer = 0
    } else if (newPlayer < 0) {
      newPlayer = 2;
    }

    dispatch({
      type: NEXT_PLAYER,
      payload: {
        newPlayer: typeof skip === 'number' ? skip : newPlayer, //* de existir el skip remplaza el procesamiento interno y mete el nuevo jugador determinado
      }
    })
  }

  const skipPlayCard = () => { //* Ejecuta el cambio de turno saltandose a un jugador cuando se juega la carta "a" o "skip"
    let newPlayer = state.turno;
    for (let i = 0; i < 2; i++) {
      newPlayer += state.direction;

      if (newPlayer > 2) {
        newPlayer = 0;
      } else if (newPlayer < 0) {
        newPlayer = 2;
      }
    }

    return newPlayer;
  }

  const reversePlayCard = () => { //* Cambia la sequiencia de juego cuando se juega la carta "b" o "Reverse"
    const newDirection = state.direction * (-1); //* Invierte los turnos del juego
    let newPlayer = state.turno + newDirection; //* Encuentra el siguiente jugador en base al nuevo orden de turnos - cambio local
    if (newPlayer > 2) {
      newPlayer = 0
    } else if (newPlayer < 0) {
      newPlayer = 2;
    }
    dispatch({
      type: NEW_SEQUENCE,
      payload: {
        direction: newDirection,
        newPlayer,
      }
    });
  }

  const drawFourPlayCard = (skip) => { //* Cuando se juega un +4 salta turno, elije un color [humano] y toma 4 cartas
    OpenSelectedCardModal(true) //* abre el modal
    const stackList = state.Stack
    const cardDraw = stackList.pop()
    const cardDraw2 = stackList.pop()
    const cardDraw3 = stackList.pop()
    const cardDraw4 = stackList.pop() //* Obtiene y quita las cartas del stack
    const currentPlayer = state.turno
    let newPlayer = currentPlayer
    if (currentPlayer == 2) { //* next player local para no afectar el estado
      newPlayer = 0
    } else {
      newPlayer = currentPlayer + 1
    }
    const handList = [...state[state.players[newPlayer]], cardDraw, cardDraw2, cardDraw3, cardDraw4] //* Las mete en el siguiente jugador
    dispatch({
      type: DRAW_PLAYER_STACK,
      payload: {
        HandList: handList,
        stackList,
        currentPlayer: state.players[newPlayer]
      }
    });
    //! Las cartas no son stakeables
    /* NextPlayer(skip); */
  }

  const drawTwoPlayCard = (skip) => { //* Cuando se juega un +2 salta de turno y el target enemigo toma 2 cartas
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
    //! Las cartas no son stakeables
    NextPlayer(skip);
  }

  const changeColorEspecialCard = (color) => { //* Al jugar una wildCard especial te permite cambiar su color
    const playZoneCard = state.PlayZone[state.PlayZone.length - 1]
    let skip = false
    if (playZoneCard.number == 'd') { //* de ser un +4 entonces realiza un cambio de turno adicional
      skip = skipPlayCard()
    }
    playZoneCard.color = color //* Cambia el color de la ultima carta
    OpenSelectedCardModal(false)
    NextPlayer(skip)
  }

  const drawTwoCardUnoButton = (skip) => { //* Castigo por no presionar el uno btn a tiempo - toma 2 cartas
    const stackList = state.Stack
    const cardDraw = stackList.pop()
    const cardDraw2 = stackList.pop()
    const handList = [...state.playerHand, cardDraw, cardDraw2]
    dispatch({
      type: DRAW_PLAYER_STACK,
      payload: {
        HandList: handList,
        stackList,
        currentPlayer: 'playerHand'
      }
    });
  }

  const wildPlayCard = () => { //* abre el modal de selección de color - [solo para humanos]
    OpenSelectedCardModal(true)
  }

  const setUpGame = (reload = false, data = {}) => { //* Carga inicial del juego - asigna las manos, stack y primera carta del playZone
    if (!reload) {
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
    } else {

      dispatch({
        type: GET_PLAYERS_CARD,
        payload: {
          playerHand: state.playerHand,
          FobosBot: state.FobosBot,
          DeimosBot: state.DeimosBot,
          firsPlayZone: [data.pop()],
          newStack: data.sort(() => Math.random() - 0.5),
        }
      })
    }
  }

  const DrawPlayerCard = () => { //* El jugador toma una carta del stack
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

  const PlayPlayerCards = (card, target) => { //* Controlador de jugar carta [humanos y robots]
    if (card.color == state.PlayZone[state.PlayZone.length - 1].color
      || card.number == state.PlayZone[state.PlayZone.length - 1].number
      || card.color == 'Especial'
    ) { //* Comprueba que las cartas sean jugables

      if (target == 'playerHand') {
        console.log(`Jugador jugo: ${card.id}`)
      }

      let skip = false; //* Nos ayuda a saber como manejar los turnos para los diferentes casos
      let alreadyExecuted = false; //* si ya se cambio de turno, no lo vuelvas hacer

      switch (card.number) { //* por cada carta especial ejecuta su función
        case 'a':
          skip = skipPlayCard()
          break;
        case 'b':
          alreadyExecuted = true;
          reversePlayCard();
          break;
        case 'c':
          drawTwoPlayCard()
          skip = skipPlayCard()
          break;
        case 'd':
          alreadyExecuted = true;
          drawFourPlayCard()
          break;
        case 'e':
          alreadyExecuted = true;
          wildPlayCard()
          break;
        default:
          break;
      }
      const newPlace = state.PlayZone
      const hand = state[target];
      hand.splice(hand.indexOf(card), 1) //* Le quita la carta de la mano del jugador
      newPlace.push(card) //* mete la carta al playZone
      const newPlayerHand = hand;


      dispatch({
        type: PLAY_PLAYER_PLAYZONE,
        payload: {
          newPlayerHand,
          target,
          newPlace,
        }
      })
      if (!alreadyExecuted) {
        NextPlayer(skip)
      }

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
      openSelectedCardModal: state.openSelectedCardModal,
      setUpGame,
      DrawPlayerCard,
      PlayPlayerCards,
      setEffectsSounds,
      drawTwoCardUnoButton,
      changeColorEspecialCard,
      logsArr: state.logsArr,
    }} >
      {children}
    </GameContext.Provider>
  )

}

export default GameState;

const drawHands = (deck) => { //* Reparte 7 cartas a cada jugador usando la clase deck
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

