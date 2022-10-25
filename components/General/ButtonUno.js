import { Avatar } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function ButtonUno({ drawTwoCardUnoButton }) {

  const [click, setclick] = useState(false)

  const NoclickButton = () => {
    drawTwoCardUnoButton()
  }

  const clickButton = () => {
    setclick(true)
  }

  useEffect(() => {
    if (!click) {
      const timer = setTimeout(() => {
        NoclickButton()
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [click])


  return (
    <>
      {!click &&
        <Avatar style={{
          backgroundColor: 'orangered',
          fontSize: '13px',
          cursor: 'pointer',
          border: '1px solid white',
        }}
          onClick={clickButton}
        >
          UNO
        </Avatar>
      }
    </>

  )
}
