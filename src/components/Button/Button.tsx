import React from 'react'
import './Button.scss'

interface Props {
  type: string
  children: string
  onClick: () => void
}

const Button: React.FC<Props> = ({ type, children, onClick }) => {
  return (
    <button className={[type, 'btn'].join(' ')} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
