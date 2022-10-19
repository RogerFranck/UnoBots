import { useContext, useEffect } from "react"
import BotHand from "../components/Hand/BotHand"
import ViewHand from "../components/Hand/ViewHand"
import PlayZone from "../components/Stack/Playzone"
import Stack from "../components/Stack/Stack"
import GameContext from "../context/GameContext"
import styles from '../styles/Home.module.css'

export default function Home() {

  const { playerHand, FobosBot, DeimosBot, setUpGame } = useContext(GameContext)

  useEffect(() => {
    setUpGame()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className={styles.Home} >
      <h1>Arttis: UnoBots</h1>
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
    </div>
  )
}
