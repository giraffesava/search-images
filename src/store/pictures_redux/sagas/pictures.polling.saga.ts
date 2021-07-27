import { call, delay, put, race, take } from 'redux-saga/effects'
import { failedServer } from '../actions/pictures.actions'
import { Pictures } from '../../types'
import createUrl from '../../functions/createUrl'
import checkDataFromApi from '../../functions/checkDataFromApi'
import fetchData from './../../functions/fetchData'
import { randomWords } from 'stuff/randomWords'

function* getPollingPicturesWorker() {
  while (true) {
    try {
      const keyword =
        randomWords[Math.floor(Math.random() * randomWords.length)]
      const createdUrl = createUrl(keyword)
      const startData = yield fetchData(createdUrl)
      const finalData = { url: startData.data.image_url, title: keyword }
      yield checkDataFromApi(finalData)
      yield delay(5000)
    } catch {
      yield put(failedServer())
    }
  }
}

export function* getPollingPicturesWatcher() {
  while (true) {
    yield take(Pictures.POLLING_START)
    yield race([call(getPollingPicturesWorker), take(Pictures.POLLING_END)])
  }
}
