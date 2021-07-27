import { PictureStore, Pictures } from '../types'
import { PicturesActions } from './pictures.actions'

const InitialStore: PictureStore = {
  loading: false,
  serverError: false,
  data: [],
  notFoundError: false,
  polling: false,
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
        serverError: false,
        notFoundError: false,
        data: [...state.data, action.data],
      }
    case Pictures.FAILED_GETTING_PICTURES:
      return {
        ...state,
        loading: false,
        notFoundError: true,
      }
    case Pictures.DELETE_DATA_PICTURES:
      return {
        ...state,
        loading: false,
        serverError: false,
        notFoundError: false,
        data: [],
      }
    case Pictures.FAILED_SERVER:
      return {
        ...state,
        loading: false,
        serverError: true,
      }
    default:
      return state
  }
}

export default pictureReducer
