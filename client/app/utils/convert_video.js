import axios from 'axios'

export function convertVideo (url, id) {
  return axios.post('/api/convert', {
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