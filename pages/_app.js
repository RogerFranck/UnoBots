import '../styles/globals.css'
import GameState from '../context/GameState'

function MyApp({ Component, pageProps }) {
  return (
    <GameState>
      <Component {...pageProps} />
    </GameState>
  )
}

export default MyApp
