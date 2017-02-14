initAudio = () => {
  let audio = document.getElementsByTagName("video")[0]
  console.log(audio)
  let boost;
  let analyser;

  //ANIMATION
  let animate = function () {
    window.requestAnimationFrame(animate);
    let fbcArray = new Uint8Array(analyser.frequencyBinCount); //audio frequency data to array
    analyser.getByteFrequencyData(fbcArray);
    boost = fbcArray; // --> length = 1024
    console.log(boost)
    // --> new AudioContext() --> createAnalyser() --> getByteFrequencyData(frequency array)
  };

  //INIT
  let initMp3Player = function () {
    let context = new AudioContext();
    analyser = context.createAnalyser(); // --> getByteFrequencyData
    // Re-route audio playback into the processing graph of the AudioContext
    let source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    animate(); //call animation
  };

  initMp3Player()
}