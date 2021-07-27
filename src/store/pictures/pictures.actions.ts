import { PictureTypes, Pictures } from '../types'

export const getPictures = (keyword: string): PictureTypes => {
  return {
    type: Pictures.GET_PICTURES,
    keyword,
  }
}

export const successGettingPictures = (data: []): PictureTypes => {
  return {
    type: Pictures.SUCCESS_GETTING_PICTURES,
    data,
  }
}

export const deleteDataPictures = (): PictureTypes => {
  return {
    type: Pictures.DELETE_DATA_PICTURES,
  }
}

export const failedGettingPictures = (): PictureTypes => {
  return {
    type: Pictures.FAILED_GETTING_PICTURES,
  }
}

export const failedServer = (): PictureTypes => {
  return {
    type: Pictures.FAILED_SERVER,
  }
}

export const pollingStart = (): PictureTypes => {
  return {
    type: Pictures.POLLING_START,
  }
}

export const pollingEnd = (): PictureTypes => {
  return {
    type: Pictures.POLLING_END,
  }
}

export type PicturesActions =
  | ReturnType<typeof getPictures>
  | ReturnType<typeof successGettingPictures>
  | ReturnType<typeof failedGettingPictures>
  | ReturnType<typeof deleteDataPictures>
  | ReturnType<typeof failedServer>
  | ReturnType<typeof pollingStart>
  | ReturnType<typeof pollingEnd>
