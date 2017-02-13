import axios from 'axios'

export function convertVideo (url) {
  return axios.post('/video/convert', {
    url,
    id: "placeholder"
	})
	.then((resp) => {
		console.log(resp.data)
  })
  .catch((error) => {
    console.log(error)
  })
}