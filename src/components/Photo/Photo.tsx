import React from 'react'
import './Photo.scss'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  url: string | any[]
  title: string
  onClick: (title: string) => void
}

const Photo: React.FC<Props> = ({ url, title, onClick }) => {
  return (
    <div className="wrapper">
      {Array.isArray(url) ? (
        <div className="double-image">
          {url.map((urls) => (
            <img
              src={urls}
              alt={title}
              className="images"
              key={uuidv4()}
              onClick={() => onClick(title[1])}
            />
          ))}
        </div>
      ) : (
        <img
          src={url}
          alt={title}
          className="image"
          onClick={() => onClick(title)}
        />
      )}
    </div>
  )
}

export default Photo
