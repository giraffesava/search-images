export enum Pictures {
  GET_PICTURES = 'GET_PICTURES',
  SUCCESS_GETTING_PICTURES = 'SUCCESS_GETTING_PICTURES',
  FAILED_GETTING_PICTURES = 'SUCCESS_FAILED_PICTURES',
  DELETE_DATA_PICTURES = 'DELETE_DATA_PICTURES',
  FAILED_SERVER = 'FAILED_SERVER',
  POLLING_START = 'POLLING_START',
  POLLING_END = 'POLLING_END',
}

export interface PictureTypes {
  type: Pictures
  keyword?: string
  data?: { url: [] | string; title: [] | string }
}

export interface PictureStore {
  loading: boolean
  serverError: boolean
  data: any[]
  notFoundError: boolean
}
