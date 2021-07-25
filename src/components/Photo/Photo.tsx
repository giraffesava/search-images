import React from 'react'
import './Photo.scss'

interface Props {
  url: string
  title: string
}

const Photo: React.FC<Props> = ({ url, title }) => {
  return <img src={url} alt={title} />
}

export default Photo
