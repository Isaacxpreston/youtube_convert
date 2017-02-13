import axios from 'axios'

export function convertVideo (url, id) {
  return axios.post('/video/convert', {
    url,
    id
	})
	.then((resp) => {
		console.log(resp.data)
  })
  .catch((error) => {
    console.log(error)
  })
}