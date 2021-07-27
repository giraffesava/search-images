import React, { useState } from 'react'
import './App.scss'
import { useDispatch, useSelector } from 'react-redux'
import Input from './../Input/Input'
import Button from './../Button/Button'
import {
  getPictures,
  deleteDataPictures,
} from './../../store/pictures/pictures.actions'
import { pictureSelector } from './../../store/pictures/characters.selectors'
import Photo from './../Photo/Photo'
import Group from 'components/Group/Group'
import { v4 as uuidv4 } from 'uuid'

const App: React.FC = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [isGroup, setIsGroup] = useState(false)
  const dispatch = useDispatch()
  const state = useSelector(pictureSelector)

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const check = /^[A-Za-z,\ ]{0,15}$/.test(e.target.value)
    if (check) {
      setValue(e.target.value.trim())
    } else {
      setError(true)
    }
  }

  // GROUP
  const groupedData = state.data.reduce((group, tag) => {
    if (!group[tag.title]) group[tag.title] = []
    group[tag.title].push(tag)
    return group
  }, {})

  const grouping = Object.keys(groupedData).map((key) => {
    return <Group data={groupedData[key]} title={key} key={uuidv4()} />
  })

  const downloadPicturesHandler = () => {
    if (!value) {
      setError(true)
    } else {
      setError(false)
      dispatch(getPictures(value))
    }
  }

  const deletePicturesHandler = () => {
    setError(false)
    setValue('')
    dispatch(deleteDataPictures())
  }

  const groupPicturesHandler = () => {
    setIsGroup((prev) => !prev)
  }

  return (
    <div className="container">
      <div className="content">
        <Input onChange={inputValueHandler} value={value} />
        <Button
          active={state.loading}
          type="download"
          onClick={downloadPicturesHandler}
        >
          {state.loading ? 'Загрузка...' : 'Загрузить'}
        </Button>
        <Button type="delete" onClick={deletePicturesHandler}>
          Очистить
        </Button>
        <Button type="group" onClick={groupPicturesHandler}>
          {isGroup ? 'Разгруппировать' : 'Группировать'}
        </Button>
        <div className="error">
          {state.notFoundError
            ? 'По тегу ничего не найдено'
            : state.serverError
            ? 'Произошла http ошибки'
            : error && value.length < 1
            ? 'заполните поле "тег"'
            : null}
        </div>
        <div className="photo-container">
          {isGroup
            ? grouping
            : state.data.map((item) => (
                <Photo
                  title={item.title && item.title[0]}
                  url={item.url}
                  key={uuidv4()}
                />
              ))}
        </div>
      </div>
    </div>
  )
}

export default App
