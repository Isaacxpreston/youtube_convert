import axios from 'axios'

export function convertVideo (url, id) {
  return axios.post('/video/convert', {
    url,
    id
	})
	.then((resp) => {
    return resp.data
  })
  .catch((error) => {
    console.log(error)
  })
}

export function postToHeroku () {
  return axios.post('https://youtube-converter.herokuapp.com/api/test', {
    dummyData: "dummy text"
	})
	.then((resp) => {
    console.log("api response", resp)
  })
  .catch((error) => {
    console.log(error)
  })
}