import BotHand from "../components/Hand/BotHand";
import ViewHand from "../components/Hand/ViewHand";
import PlayZone from "../components/Stack/Playzone";
import Stack from "../components/Stack/Stack";
import styles from "../styles/Home.module.css";
import ButtonUno from "../components/General/ButtonUno";
import SelectedColor from "../components/General/SelectedColor";
import Bar from "../components/Sidebar/Bar";
import useGameMaster from "../hooks/useGameMaster";

export default function Home() {
  const {
    win,
    players,
    playerHand,
    drawTwoCardUnoButton,
    turno,
    FobosBot,
    DeimosBot,
  } = useGameMaster();

  return (
    <div className={styles.Home}>
      <SelectedColor />
      {win.win ? (
        <div className={styles.win}>Winner {win.player}! </div>
      ) : (
        <>
          <div className={styles.Sidebar}>
            <Bar />
          </div>
          <h1 style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Arttis: GameBots</div>{" "}
            <div
              style={
                players[turno] == "playerHand"
                  ? {
                      color: "#00ce67",
                    }
                  : { color: "white" }
              }
            >
              Turn of {players[turno]}
            </div>
          </h1>
          <div className={styles.play}>
            <BotHand listCard={FobosBot} left />
            <div className={styles.desks}>
              <Stack />
              <PlayZone />
            </div>
            <BotHand listCard={DeimosBot} />
          </div>
          <center>
            {playerHand.length == 1 && (
              <ButtonUno drawTwoCardUnoButton={drawTwoCardUnoButton} />
            )}
            <ViewHand listCard={playerHand} />
          </center>
        </>
      )}
      <span>Fines educativos</span>
    </div>
  );
}
