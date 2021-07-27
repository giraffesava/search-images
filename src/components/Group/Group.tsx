import React from 'react'
import './Group.scss'
import Photo from './../Photo/Photo'
import { v4 as uuidv4 } from 'uuid'
interface Props {
  data: any[]
  title: string
  onClick: (title: string) => void
}

const Group: React.FC<Props> = ({ data, title, onClick }) => {
  const titleChange = [...new Set(title.split(','))].join(',')
  return (
    <div className="group-container">
      <h1>{titleChange}</h1>
      <div className="group-content">
        {data.map((item) => {
          title = item.title
          return (
            <Photo
              url={item.url}
              title={title}
              key={uuidv4()}
              onClick={onClick}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Group
