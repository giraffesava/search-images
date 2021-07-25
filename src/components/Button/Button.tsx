import React from 'react'
import './Button.scss'

interface Props {
  active?: boolean
  type: string
  children: string
  onClick: () => void
}

const Button: React.FC<Props> = ({ type, children, onClick, active }) => {
  return (
    <button
      className={[type, 'btn'].join(' ')}
      disabled={active}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
