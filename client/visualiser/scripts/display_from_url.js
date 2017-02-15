const sizes = {
  1: "20em",
  2: "17em",
  3: "14em",
  4: "13em",
  5: "10em",
  6: "7em",
  7: "7em",
  8: "6em",
  9: "5em",
  10: "5em"
}

let textLength = decodeURI(window.location.pathname.slice(1)).length
document.body.style.fontSize = sizes[textLength]
document.getElementsByTagName("text")[0].innerHTML = decodeURI(window.location.pathname.slice(1))

axios.get('/api/file' + window.location.pathname)
.then(function (response) {
  document.getElementsByTagName("video")[0].src = response.data
  document.getElementsByTagName("video")[1].src = response.data
  document.getElementsByTagName("video")[0].setAttribute('crossorigin', 'anonymous');
  document.getElementsByTagName("video")[1].setAttribute('crossorigin', 'anonymous');
  initAudio()
  init()
  animate()
  document.getElementsByTagName("video")[0].play()
  document.getElementsByTagName("video")[1].play()
})
.catch(function (error) {
  console.log(error);
});