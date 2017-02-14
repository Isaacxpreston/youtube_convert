document.getElementsByTagName("video")[0].height = window.innerHeight
document.getElementsByTagName("video")[0].width = window.innerWidth

axios.get('/api' + window.location.pathname)
.then(function (response) {
  document.getElementsByTagName("video")[0].src = response.data
  document.getElementsByTagName("video")[0].play()
  initAudio()
})
.catch(function (error) {
  console.log(error);
});