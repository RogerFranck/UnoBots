import BotHand from "../components/Hand/BotHand";
import ViewHand from "../components/Hand/ViewHand";
import PlayZone from "../components/Stack/Playzone";
import Stack from "../components/Stack/Stack";
import styles from "../styles/Home.module.css";
import ButtonUno from "../components/General/ButtonUno";
import SelectedColor from "../components/General/SelectedColor";
import Bar from "../components/Sidebar/Bar";
import useGameMaster from "../hooks/useGameMaster";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { nickName } = router.query;
  const {
    win,
    players,
    playerHand,
    drawTwoCardUnoButton,
    turno,
    FobosBot,
    DeimosBot,
    isIaTeam,
  } = useGameMaster();
  return (
    <div className={styles.Home}>
      <SelectedColor />
      {win.win ? (
        <div className={styles.win}>Winner {win.player}! </div>
      ) : (
        <>
          <div className={styles.Sidebar}>
            <div className={styles.Sidebar}>
              <Link href="/">
                <Avatar
                  style={{
                    backgroundColor: "black",
                    cursor: "pointer",
                    marginRight: "25px",
                  }}
                >
                  <ArrowBackIcon />
                </Avatar>
              </Link>
              <Bar />
              <div
                style={{
                  marginLeft: "25px",
                }}
                className={styles.txt}
              >
                Arttis: GameBots
              </div>
            </div>
            <div
              className={styles.txt}
              style={
                players[turno] == "playerHand"
                  ? {
                      color: "#00ce67",
                    }
                  : { color: "white" }
              }
            >
              {players[turno] == "playerHand" ? (
                <>Turn of {nickName}</>
              ) : (
                <>Turn of {players[turno]}</>
              )}
            </div>
          </div>
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
      <div className={styles.Sidebar}>
        <span>educational purposes</span>
        <span> Bots mode: {isIaTeam ? "team" : "single"} </span>
      </div>
    </div>
  );
}
