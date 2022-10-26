/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import BotHand from "../components/Hand/BotHand"
import ViewHand from "../components/Hand/ViewHand"
import PlayZone from "../components/Stack/Playzone"
import Stack from "../components/Stack/Stack"
import GameContext from "../context/GameContext"
import styles from '../styles/Home.module.css'
import Bot from "../classes/Bot"
import ButtonUno from "../components/General/ButtonUno"
import SelectedColor from "../components/General/SelectedColor"

export default function Home() {

  const {
    playerHand,
    FobosBot,
    DeimosBot,
    setUpGame,
    turno,
    PlayZoneData,
    DrawPlayerCard,
    PlayPlayerCards,
    setEffectsSounds,
    Stack: stack,
    players,
    drawTwoCardUnoButton
  } = useContext(GameContext)

  const fun = {
    DrawPlayerCard,
    PlayPlayerCards
  }

  const [win, setwin] = useState({
    win: false,
    player: 'Unknow'
  })

  const cargarSonido = (fuente) => {
    const sonido = document.createElement("audio");
    sonido.src = fuente;
    sonido.setAttribute("preload", "auto");
    sonido.setAttribute("controls", "none");
    sonido.style.display = "none"; // <-- oculto
    document.body.appendChild(sonido);
    return sonido;
  };

  useEffect(() => {
    setUpGame()
    setEffectsSounds(cargarSonido('/sound/pop.mp3'), 'sonidoPop')
    setEffectsSounds(cargarSonido('/sound/deslizar.mp3'), 'sonidoDraw')
  }, [])

  useEffect(() => {
    if (!stack.length) {
      setUpGame(true, PlayZoneData)
    }
    console.log("TURNOS")
    if (playerHand.length == 0) {
      setwin({
        win: true,
        player: 'Player'
      })
    }
    if (FobosBot.length == 0) {
      setwin({
        win: true,
        player: 'Fobos bot'
      })
    }
    if (DeimosBot.length == 0) {
      setwin({
        win: true,
        player: 'Deimos bot'
      })
    }
  }, [playerHand, FobosBot, DeimosBot, turno])

  useEffect(() => {
    if (!stack.length) {
      setUpGame(true, PlayZoneData)
    }
    const Deimos = new Bot({ name: 'DeimosBot', hand: DeimosBot, fun, PlayZoneData })
    const Fobos = new Bot({ name: 'FobosBot', hand: FobosBot, fun, PlayZoneData })
    const timer = setTimeout(() => {
      if (turno == 1) {
        Deimos.play()
        console.log(DeimosBot)
      }
      if (turno == 2) {
        Fobos.play()
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [turno])


  return (
    <div className={styles.Home} >
      <SelectedColor />
      {
        win.win ?
          <div className={styles.win} >Winner {win.player}! </div>
          :
          <>
            <h1 style={{ display: 'flex', justifyContent: 'space-between' }} >
              <div>Arttis: GameBots</div>  <div>Turn of {players[turno]}</div>
            </h1>
            <div className={styles.play} >
              <BotHand listCard={FobosBot} left />
              <div className={styles.desks} >
                <Stack />
                <PlayZone />
              </div>
              <BotHand listCard={DeimosBot} />
            </div>
            <center>
              {
                playerHand.length == 1 &&
                <ButtonUno drawTwoCardUnoButton={drawTwoCardUnoButton} />
              }
              <ViewHand listCard={playerHand} />
            </center>
          </>
      }
    </div>
  )
}
