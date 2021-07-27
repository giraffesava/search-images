import { put, takeEvery } from 'redux-saga/effects'
import {
  successGettingPictures,
  failedGettingPictures,
  failedServer,
  //pollingStart,
  //pollingEnd,
} from './pictures.actions'
//import { API_KEY } from './../API_KEY'
import { Pictures } from '../types'
import { randomWords } from './../../../stuff/randomWords'

const API_KEY = 'ДОБАВИТЬ СЮДА API_KEY'

// форматирование данных, переход из массива в объект
const reduceFunc = (data) => {
  return data.reduce((acc, item) => {
    if (data.length > 1) {
      for (let key in item) {
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(item[key])
      }
    } else {
      for (let key in item) {
        acc[key] = item[key]
      }
    }
    return acc
  }, {})
}

// Создаю url адресс для запроса
const urlFunc = (request) => {
  let keyword = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=`
  if (request.includes(',')) {
    keyword = request.split(',').map((item) => {
      return keyword + item
    })
  } else if (request === 'keyword') {
    keyword += randomWords[Math.floor(Math.random() * randomWords.length)]
  } else {
    keyword += request
  }
  return keyword
}

// Получаю данные и обрабатываю из API
const fetchData = (urlAddress) => {
  return fetch(urlAddress).then((res) => res.json())
}

//Проверка возвращает ли что-то сервер
const checkData = (data) => {
  const type = typeof data.url
  let checkObj
  if (type === 'object') {
    checkObj = data.url.some((item) => {
      return item === undefined
    })
  }
  if ((!checkObj && checkObj !== undefined) || type === 'string') {
    return put(successGettingPictures(data))
  }
  return put(failedGettingPictures())
}

function* getPicturesWorker(word) {
  const { keyword } = word
  const createdUrl = urlFunc(keyword)

  //Проверяю содержит ли запрос ",", если да, то обратываю через Promise.all
  if (keyword.includes(',')) {
    try {
      const startData = yield Promise.all(
        Array.isArray(createdUrl)
          ? createdUrl.map((item) => {
              return fetchData(item)
            })
          : null,
      )
      const semiData = startData.map((item) => {
        return { url: item.data.image_url, title: keyword }
      })
      const finalData = yield reduceFunc(semiData)
      yield checkData(finalData)
    } catch (error) {
      yield put(failedServer())
    }
  } /*else if (keyword === 'delay') {
    try {
      put(pollingStart())
      while (true) {
        ;('выполнять запрос')
      }
    } catch {}
  } */ else {
    try {
      const startData = yield fetchData(createdUrl)
      const finalData = { url: startData.data.image_url, title: keyword }
      yield checkData(finalData)
    } catch (error) {
      yield put(failedServer())
    }
  }
}

export function* getPicturesWatcher(): Generator {
  yield takeEvery(Pictures.GET_PICTURES, getPicturesWorker)
}
