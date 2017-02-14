initAudio = () => {
  let audio = document.getElementsByTagName("video")[0]
  console.log(audio)
  let boost;
  let analyser;

  //ANIMATION
  let animate = function () {
    window.requestAnimationFrame(animate);
    let fbcArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbcArray);
    boost = fbcArray; // length = 1024
    document.getElementById("box1").innerHTML = boost[100]
    document.getElementById("box2").innerHTML = boost[200]
  };

  //INIT
  let initMp3Player = function () {
    let context = new AudioContext();
    analyser = context.createAnalyser();
    let source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    animate();
  };

  initMp3Player()
}