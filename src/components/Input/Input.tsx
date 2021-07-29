import React from 'react'
import './Input.scss'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder: string
  type: string
}

const Input: React.FC<Props> = ({ onChange, value, placeholder, type }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}

export default Input
