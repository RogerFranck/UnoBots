import { Avatar } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function ButtonUno({ drawTwoCardUnoButton }) {

  const [click, setclick] = useState(false)

  const NoclickButton = () => {
    drawTwoCardUnoButton() //* Controlador de castigo
  }

  const clickButton = () => {
    setclick(true)
  }

  useEffect(() => { //* Al renderizar componente inicia un timer para ejecutar la funcion de castigo
    if (!click) { //* si el btn es precionado antes de que se acabe el tiempo se mata el componente y no se ejecuta el castigo
      const timer = setTimeout(() => {
        NoclickButton()
      }, 1500);
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
