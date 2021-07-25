export enum Pictures {
  GET_PICTURES = 'GET_PICTURES',
  SUCCESS_GETTING_PICTURES = 'SUCCESS_GETTING_PICTURES',
  FAILED_GETTING_PICTURES = 'SUCCESS_FAILED_PICTURES',
}

export interface PictureTypes {
  type?: Pictures
  keyword?: string
  data?: any[]
}

export interface PictureStore {
  loading: boolean
  error: boolean
  data: any[]
}
