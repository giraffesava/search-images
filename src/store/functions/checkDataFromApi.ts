import { put } from 'redux-saga/effects'
import {
  successGettingPictures,
  failedGettingPictures,
} from '../pictures_redux/actions/pictures.actions'

//Проверка возвращает ли что-то сервер
const checkDataFromApi = (data: { url: [] | string; title: [] | string }) => {
  let checkObj
  if (typeof data.url === 'object') {
    checkObj = data.url.some((item) => {
      return item === undefined
    })
  }
  if ((!checkObj && checkObj !== undefined) || typeof data.url === 'string') {
    return put(successGettingPictures(data))
  }
  return put(failedGettingPictures())
}

export default checkDataFromApi
