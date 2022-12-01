import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import GameContext from "../context/GameContext";
import styles from "../styles/Landing.module.css";

export default function UnoBotsIndex() {
  const router = useRouter();
  const [isTeam, setisTeam] = useState(true);
  const [name, setname] = useState("Player");
  const { handleSetIaCoop } = useContext(GameContext);

  const handleClick = (isT) => {
    setisTeam(isT);
  };

  const handleSetName = (nameData) => {
    handleSetIaCoop(isTeam);
    router.push(`/Game?nickName=${nameData}`);
  };

  return (
    <div className={styles.menu}>
      <Image
        className={styles.img}
        alt="ZergGod"
        src="/LogsImg/zerg.png"
        width={150}
        height={150}
      />
      <span className={styles.title}>UnoBots</span>
      <input
        placeholder="Name"
        onChange={(e) => setname(e.target.value)}
        className={styles.campo}
        type="text"
      />
      <div className={styles.containerSelect}>
        <div
          className={isTeam ? styles.selectItemSelected : styles.selectItem}
          onClick={() => handleClick(true)}
        >
          Team
        </div>
        <div
          className={!isTeam ? styles.selectItemSelected : styles.selectItem}
          onClick={() => handleClick(false)}
        >
          Solitary
        </div>
      </div>
      <Button
        className={styles.btn}
        onClick={() => handleSetName(name)}
        variant="contained"
      >
        Play
      </Button>
    </div>
  );
}
