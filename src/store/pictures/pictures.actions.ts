import { PictureTypes, Pictures } from '../types'

export const getPictures = (keyword: string): PictureTypes => {
  return {
    type: Pictures.GET_PICTURES,
    keyword,
  }
}

export const successGettingPictures = (data: Array<any>): PictureTypes => {
  return {
    type: Pictures.SUCCESS_GETTING_PICTURES,
    data,
  }
}

export const failedGettingPictures = (): PictureTypes => {
  return {
    type: Pictures.FAILED_GETTING_PICTURES,
  }
}

export type PicturesActions =
  | ReturnType<typeof getPictures>
  | ReturnType<typeof successGettingPictures>
  | ReturnType<typeof failedGettingPictures>
