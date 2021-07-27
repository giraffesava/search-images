import { put, takeEvery } from 'redux-saga/effects'
import { failedServer } from '../actions/pictures.actions'
import { Pictures } from '../../types'
import createUrl from '../../functions/createUrl'
import checkDataFromApi from '../../functions/checkDataFromApi'
import fetchData from '../../functions/fetchData'

function* getSinglePicturesWorker(word) {
  const { keyword } = word
  if (keyword.includes(',')) {
    return false
  }
  const createdUrl = createUrl(keyword)
  try {
    const startData = yield fetchData(createdUrl)
    const finalData = { url: startData.data.image_url, title: keyword }
    yield checkDataFromApi(finalData)
  } catch (error) {
    yield put(failedServer())
  }
}

export function* getSinglePicturesWatcher(): Generator {
  yield takeEvery(Pictures.GET_PICTURES, getSinglePicturesWorker)
}
