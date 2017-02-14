document.getElementsByTagName("video")[0].height = window.innerHeight
document.getElementsByTagName("video")[0].width = window.innerWidth

axios.get('/api' + window.location.pathname)
.then(function (response) {
  document.getElementsByTagName("video")[0].src = response.data
  initAudio()
  init()
  animate()
  document.getElementsByTagName("video")[0].play()
})
.catch(function (error) {
  console.log(error);
});