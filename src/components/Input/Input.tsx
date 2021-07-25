import React from 'react'
import './Input.scss'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

const Input: React.FC<Props> = ({ onChange, value }) => {
  return (
    <input
      type="text"
      autoFocus
      placeholder="Введите тег"
      onChange={onChange}
      value={value}
    />
  )
}

export default Input
