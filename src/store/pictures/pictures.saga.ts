//https://api.giphy.com/v1/gifs/search?api_key=JwZEALrQR5Tawm640pG7W74oPJxjbXN4&q=cats&limit=10&offset=0&rating=g&lang=en

import axios from 'axios'
import { put, delay, takeLatest } from 'redux-saga/effects'
import {
  getPictures,
  successGettingPictures,
  failedGettingPictures,
} from './pictures.actions'
import { API_KEY } from './../API_KEY'
import { Pictures } from '../types'

function* getPicturesWorker(keyword) {
  try {
    console.log(keyword)
  } catch (error) {}
}

export function* getPicturesWatcher(): Generator {
  yield takeLatest(Pictures.GET_PICTURES, getPicturesWorker)
}
