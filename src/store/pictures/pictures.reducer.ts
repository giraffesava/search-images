import { PictureStore, Pictures } from '../types'
import { PicturesActions } from './pictures.actions'

const InitialStore: PictureStore = {
  error: false,
  loading: false,
  data: [],
}

const pictureReducer = (
  state = InitialStore,
  action: PicturesActions,
): PictureStore => {
  switch (action.type) {
    case Pictures.GET_PICTURES:
      return {
        ...state,
        loading: true,
      }
    case Pictures.SUCCESS_GETTING_PICTURES:
      return {
        ...state,
        loading: false,
        data: action.data,
      }
    case Pictures.FAILED_GETTING_PICTURES:
      return {
        ...state,
        error: true,
      }
  }
}

export default pictureReducer
