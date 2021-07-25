import { createStore, applyMiddleware } from 'redux'
import pictureReducer from './pictures/pictures.reducer'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getPicturesWatcher } from './pictures/pictures.saga'

export const initStore = (): any => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    pictureReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  )
  sagaMiddleware.run(getPicturesWatcher)
  return store
}
