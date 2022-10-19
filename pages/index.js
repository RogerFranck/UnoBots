import { useContext, useEffect, useState } from "react"
import BotHand from "../components/Hand/BotHand"
import ViewHand from "../components/Hand/ViewHand"
import PlayZone from "../components/Stack/Playzone"
import Stack from "../components/Stack/Stack"
import GameContext from "../context/GameContext"
import styles from '../styles/Home.module.css'
import { turns } from '../constants/constants'

export default function Home() {

  const { playerHand, FobosBot, DeimosBot, setUpGame, turno } = useContext(GameContext)

  const [win, setwin] = useState({
    win: false,
    player: 'Unknow'
  })

  useEffect(() => {
    setUpGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
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
  }, [playerHand, FobosBot, DeimosBot])


  return (
    <div className={styles.Home} >
      {
        win.win ?
          <div className={styles.win} >Win {win.player} </div>
          :
          <>
            <h1 style={{ display: 'flex', justifyContent: 'space-between' }} >
              <div>Arttis: UnoBots</div>  <div>turn of {turns[turno]}</div> </h1>
            <div className={styles.play} >
              <BotHand listCard={FobosBot} left />
              <div className={styles.desks} >
                <Stack />
                <PlayZone />
              </div>
              <BotHand listCard={DeimosBot} />
            </div>
            <center>
              <ViewHand listCard={playerHand} />
            </center>
          </>
      }
    </div>
  )
}
