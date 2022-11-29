import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Landing.module.css";

export default function UnoBotsIndex() {
  return (
    <div className={styles.menu}>
      <Image alt='ZergGod' src='/LogsImg/zerg.png' width={150} height={150} />
      <span className={styles.title} >UnoBots</span>
      <br />
      <Link href="/Game">
        <Button className={styles.btn} variant="contained" >Play</Button>
      </Link>
    </div>
  );
}
