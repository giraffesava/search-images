import { createStore, applyMiddleware } from 'redux'
import pictureReducer from './pictures_redux/reducers/pictures.reducer'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getMultiPicturesWatcher } from './pictures_redux/sagas/pictures.multi.saga'
import { getSinglePicturesWatcher } from './pictures_redux/sagas/pictures.single.saga'
import { getPollingPicturesWatcher } from './pictures_redux/sagas/pictures.polling.saga'

export const initStore = (): any => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    pictureReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  )
  sagaMiddleware.run(getMultiPicturesWatcher)
  sagaMiddleware.run(getSinglePicturesWatcher)
  sagaMiddleware.run(getPollingPicturesWatcher)

  return store
}
