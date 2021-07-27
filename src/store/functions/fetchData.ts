// Получаю данные и обрабатываю из API
const fetchData = (urlAddress: any) => {
  return fetch(urlAddress).then((res) => res.json())
}
export default fetchData
