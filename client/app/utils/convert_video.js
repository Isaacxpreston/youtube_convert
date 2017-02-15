import axios from 'axios'

export function convertVideo (url, id) {
  //'https://youtube-converter.herokuapp.com/api/convert'
  //production
  return axios.post('http://localhost:4001/api/convert', {
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

// export function postToHeroku () {
//   return axios.post('https://youtube-converter.herokuapp.com/api/convert', {
//     dummyData: "dummy text"
// 	})
// 	.then((resp) => {
//     console.log("api response", resp)
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// }