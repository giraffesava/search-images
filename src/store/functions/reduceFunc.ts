// форматирование данных, переход из массива в объект
const reduceFunc = (data: any[]) => {
  console.log(data)
  return data.reduce((acc, item) => {
    if (data.length > 1) {
      for (let key in item) {
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(item[key])
      }
    } else {
      for (let key in item) {
        acc[key] = item[key]
      }
    }
    return acc
  }, {})
}

export default reduceFunc
