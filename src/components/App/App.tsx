import React, { useState } from 'react'
import './App.scss'
import { useDispatch, useSelector } from 'react-redux'
import Input from './../Input/Input'
import Button from './../Button/Button'
import { getPictures } from './../../store/pictures/pictures.actions'
import { pictureSelector } from './../../store/pictures/characters.selectors'
import Photo from './../Photo/Photo'

const App: React.FC = () => {
  const [value, setValue] = useState('')
  const [pictures, setPictures] = useState([])
  const dispatch = useDispatch()

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const state = useSelector(pictureSelector)

  const downloadPicturesHandler = () => {
    dispatch(getPictures(value))
  }

  const deletePicturesHandler = () => {
    console.log('deleting...')
  }

  const groupPicturesHandler = () => {
    console.log('grouping')
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
          Группировать
        </Button>

        {/* {state.data.map((item) => (
          <Photo title={item.title} url={item.url} />
        ))} */}
      </div>
    </div>
  )
}

export default App
