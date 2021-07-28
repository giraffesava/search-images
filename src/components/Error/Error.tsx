import React from 'react'
import './Error.scss'
import { useSelector } from 'react-redux'
import { pictureSelector } from '../../store/pictures_redux/selectors/characters.selectors'

interface Props {
  error: boolean
  value: string
}

const Error: React.FC<Props> = ({ error, value }) => {
  const state = useSelector(pictureSelector)
  return (
    <div className="error">
      {state.notFoundError
        ? 'По тегу ничего не найдено'
        : state.serverError
        ? 'Произошла http ошибка'
        : error && value.length < 1
        ? 'заполните поле "тег"'
        : null}
    </div>
  )
}

export default Error
