import React, { useState } from 'react'
import './App.scss'
import { useDispatch, useSelector } from 'react-redux'
import Input from './../Input/Input'
import Button from './../Button/Button'
import {
  getPictures,
  deleteDataPictures,
  pollingStart,
  pollingEnd,
} from '../../store/pictures_redux/actions/pictures.actions'
import { pictureSelector } from '../../store/pictures_redux/selectors/characters.selectors'
import Photo from './../Photo/Photo'
import Group from 'components/Group/Group'
import Error from './../Error/Error'
import { v4 as uuidv4 } from 'uuid'

const App: React.FC = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [isGroup, setIsGroup] = useState(false)
  const dispatch = useDispatch()
  const state = useSelector(pictureSelector)

  // Группировка
  const groupedData = state.data.reduce((group, tag) => {
    if (!group[tag.title]) group[tag.title] = []
    group[tag.title].push(tag)
    return group
  }, {})

  // Обработка и проверка вводимых данных
  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const check = /^[A-Za-z,\ ]{0,10}$/.test(e.target.value)
    if (check) {
      setValue(e.target.value.trim())
    } else {
      setError(true)
    }
  }

  // Вводить в инпут название тега кликом мыши
  const getValueByClick = (title: string) => {
    setValue(title)
  }

  // Кнопки
  const downloadPicturesHandler = () => {
    if (!value) {
      setError(true)
    } else if (value === 'delay') {
      dispatch(pollingStart())
    } else {
      setError(false)
      dispatch(getPictures(value))
    }
    setValue('')
  }

  const deletePicturesHandler = () => {
    dispatch(pollingEnd())
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
        <Input
          onChange={inputValueHandler}
          value={value}
          type="text"
          placeholder="Введите тег"
        />
        <Button
          type="button"
          active={state.loading}
          action="download"
          onClick={downloadPicturesHandler}
        >
          {state.loading ? 'Загрузка...' : 'Загрузить'}
        </Button>
        <Button type="button" action="delete" onClick={deletePicturesHandler}>
          Очистить
        </Button>
        <Button type="button" action="group" onClick={groupPicturesHandler}>
          {isGroup ? 'Разгруппировать' : 'Группировать'}
        </Button>
        <Error error={error} value={value} />
        <div className="photo-container">
          {isGroup
            ? Object.keys(groupedData).map((key) => {
                return (
                  <Group
                    data={groupedData[key]}
                    title={key}
                    key={uuidv4()}
                    onClick={getValueByClick}
                  />
                )
              })
            : state.data.map((item) => (
                <Photo
                  title={item.title}
                  url={item.url}
                  key={uuidv4()}
                  onClick={getValueByClick}
                />
              ))}
        </div>
      </div>
    </div>
  )
}

export default App
