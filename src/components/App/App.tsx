import React from 'react'
import './App.scss'

import Input from './../Input/Input'
import Button from './../Button/Button'

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="content">
        <Input />
        <Button type="download">Загрузить</Button>
        <Button type="delete">Очистить</Button>
        <Button type="group">Группировать</Button>
      </div>
    </div>
  )
}

export default App
