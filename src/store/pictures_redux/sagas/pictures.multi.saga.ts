import { put, takeEvery } from 'redux-saga/effects'
import { failedServer } from '../actions/pictures.actions'
import { Pictures } from '../../types'
import reduceFunc from '../../functions/reduceFunc'
import createUrl from '../../functions/createUrl'
import checkDataFromApi from '../../functions/checkDataFromApi'
import fetchData from './../../functions/fetchData'

function* getMultiPicturesWorker(word) {
  const { keyword } = word
  const createdUrl = createUrl(keyword)
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
      yield checkDataFromApi(finalData)
    } catch {
      yield put(failedServer())
    }
  }
}

export function* getMultiPicturesWatcher(): Generator {
  yield takeEvery(Pictures.GET_PICTURES, getMultiPicturesWorker)
}
