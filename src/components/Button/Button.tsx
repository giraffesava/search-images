import React from 'react'
import './Button.scss'

interface Props {
  type: string
  children: string
}

const Button: React.FC<Props> = ({ type, children }) => {
  console.log(typeof type)
  return <button className={[type, 'btn'].join(' ')}>{children}</button>
}

export default Button
