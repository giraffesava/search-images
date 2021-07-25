import { put, delay, takeLatest } from 'redux-saga/effects'
import {
  successGettingPictures,
  failedGettingPictures,
} from './pictures.actions'
import { API_KEY } from './../API_KEY'
import { Pictures } from '../types'

function* getPicturesWorker(word) {
  const { keyword } = word
  const keywords = keyword.split(',').map((item) => {
    return `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=3&q=${item}`
  })
  try {
    const data = yield Promise.all(
      keywords.map((url) =>
        fetch(url)
          .then((res) => res.json())
          .then((resp) =>
            resp.data.map((item) => {
              const numberQ = url.indexOf('q') + 2 // numberQ - число, которое поможет определить слово, по-которому делается запрос(после "q=")
              return {
                url: item.images.downsized.url,
                title: url.slice(numberQ, url.length),
              }
            }),
          ),
      ),
    )
    // Из массивов в массиве делаю массив со всеми объектами
    const dataFinal = data.reduce((acc, items) => acc.concat(items), [])
    yield put(successGettingPictures(dataFinal))
  } catch (error) {
    yield put(failedGettingPictures())
  }
}

export function* getPicturesWatcher(): Generator {
  yield takeLatest(Pictures.GET_PICTURES, getPicturesWorker)
}
