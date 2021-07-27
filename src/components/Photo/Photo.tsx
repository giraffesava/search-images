import React from 'react'
import './Photo.scss'
import { v4 as uuidv4 } from 'uuid'
interface Props {
  url: any
  title: any
}

const Photo: React.FC<Props> = ({ url, title }) => {
  return (
    <div className="wrapper">
      {Array.isArray(url) ? (
        <div className="double-image">
          {url.map((urls) => (
            <img src={urls} alt={title} className="images" key={uuidv4()} />
          ))}
        </div>
      ) : (
        <img src={url} alt={title} className="image" />
      )}
    </div>
  )
}

export default Photo
