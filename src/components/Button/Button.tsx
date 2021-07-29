import React from 'react'
import './Button.scss'

interface Props {
  active?: boolean
  action: string
  children: string
  onClick: () => void
  type: 'button' | 'submit' | 'reset'
}

const Button: React.FC<Props> = ({
  action,
  type,
  children,
  onClick,
  active,
}) => {
  return (
    <button
      type={type}
      className={[action, 'btn'].join(' ')}
      disabled={active}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
