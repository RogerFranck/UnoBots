/* eslint-disable react-hooks/exhaustive-deps */
import Bot from "../classes/Bot";
import { useContext, useEffect, useState } from "react";
import GameContext from "../context/GameContext";

export default function useGameMaster() {
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
    drawTwoCardUnoButton,
    changeColorEspecialCard,
    logsArr,
    isIaTeam,
  } = useContext(GameContext);
  const fun = {
    //* Pasando controladores de juego a los robots
    DrawPlayerCard,
    PlayPlayerCards,
    changeColorEspecialCard,
  };

  const [win, setwin] = useState({
    win: false,
    player: "Unknow",
  });

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
    //* Carga inicial del juego [manos, stack, primera carta]
    setUpGame();
    setEffectsSounds(cargarSonido("/sound/pop.mp3"), "sonidoPop"); //* carga de efectos de sonidos
    setEffectsSounds(cargarSonido("/sound/deslizar.mp3"), "sonidoDraw");
  }, []);

  useEffect(() => {
    //* Verifica la victoria de algun bot o jugador
    if (!stack.length) {
      //* en caso de que el stack se acabe lo recompone con las catas jugadas previamente ordenadas al azar
      setUpGame(true, PlayZoneData);
    }
    if (playerHand.length == 0) {
      setwin({
        win: true,
        player: "Player",
      });
    }
    if (FobosBot.length == 0) {
      setwin({
        win: true,
        player: "Fobos bot",
      });
    }
    if (DeimosBot.length == 0) {
      setwin({
        win: true,
        player: "Deimos bot",
      });
    }
  }, [playerHand, FobosBot, DeimosBot, turno]);

  useEffect(() => {
    //* Inicia las jugadas de los robots cuando es su turno
    if (!stack.length) {
      setUpGame(true, PlayZoneData);
    }
    const Deimos = new Bot({
      name: "DeimosBot",
      hand: DeimosBot,
      fun,
      PlayZoneData,
      isIaTeam,
    });
    const Fobos = new Bot({
      name: "FobosBot",
      hand: FobosBot,
      fun,
      PlayZoneData,
      isIaTeam,
    });
    let jugada = "";
    const timer = setTimeout(() => {
      //* El turno del robot dura 2 segundos
      if (turno == 1) {
        jugada = Deimos.play(Fobos, turno); //* El robot juega
        logsArr.push(jugada);
      }
      if (turno == 2) {
        jugada = Fobos.play(Deimos, turno); //* El robot juega
        logsArr.push(jugada);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [turno]);

  return {
    win,
    players,
    playerHand,
    drawTwoCardUnoButton,
    turno,
    FobosBot,
    DeimosBot,
    isIaTeam
  };
}
