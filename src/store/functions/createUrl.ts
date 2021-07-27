import { API_KEY } from '../../store/API_KEY'

// Создание url адреса для запроса
const createUrl = (request: string | any[]) => {
  let keyword:
    | string
    | string[] = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=`
  if (request.includes(',') && typeof request === 'string') {
    return (keyword = request.split(',').map((item) => {
      return keyword + item
    }))
  } else {
    keyword += request
  }
  return keyword
}

export default createUrl
