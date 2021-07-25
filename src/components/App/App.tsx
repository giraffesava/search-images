import React, { useState } from 'react'
import './App.scss'
import { useDispatch, useSelector } from 'react-redux'
import Input from './../Input/Input'
import Button from './../Button/Button'
import { getPictures } from './../../store/pictures/pictures.actions'
import { pictureSelector } from './../../store/pictures/characters.selectors'

const App: React.FC = () => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const state = useSelector(pictureSelector)
  const downloadPicturesHandler = () => {
    console.log('getting', value)
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
        {state.loading ? <h1>Loading...</h1> : null}
        <Button type="download" onClick={downloadPicturesHandler}>
          Загрузить
        </Button>
        <Button type="delete" onClick={deletePicturesHandler}>
          Очистить
        </Button>
        <Button type="group" onClick={groupPicturesHandler}>
          Группировать
        </Button>
      </div>
    </div>
  )
}

export default App
