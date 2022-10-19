import BotHand from "../components/Hand/BotHand"
import ViewHand from "../components/Hand/ViewHand"
import PlayZone from "../components/Stack/Playzone"
import Stack from "../components/Stack/Stack"
import styles from '../styles/Home.module.css'

const ExampleHand = [
  { number: '2', color: 'Red' },
  { number: '7', color: 'Blue' },
  { number: '9', color: 'Yellow' },
  { number: '4', color: 'Green' },
  { number: '3', color: 'Red' },
  { number: '0', color: 'Yellow' },
  { number: '2', color: 'Green' },
]

const ExampleBotHandOne = [
  { number: '2', color: 'Red' },
  { number: '7', color: 'Blue' },
  { number: '9', color: 'Yellow' },
  { number: '4', color: 'Green' },
  { number: '3', color: 'Red' },
  { number: '0', color: 'Yellow' },
  { number: '2', color: 'Green' },
]

const ExampleBotHandTwo = [
  { number: '2', color: 'Red' },
  { number: '7', color: 'Blue' },
  { number: '9', color: 'Yellow' },
  { number: '4', color: 'Green' },
  { number: '3', color: 'Red' },
  { number: '0', color: 'Yellow' },
  { number: '2', color: 'Green' },
]

export default function Home() {
  return (
    <div className={styles.Home} >
      <h1>Arttis UnoBot</h1>
      <div className={styles.play} >
        <BotHand listCard={ExampleBotHandOne} left />
        <div className={styles.desks} >
          <Stack />
          <PlayZone />
        </div>
        <BotHand listCard={ExampleBotHandTwo} />
      </div>
      <ViewHand listCard={ExampleHand} />
    </div>
  )
}
