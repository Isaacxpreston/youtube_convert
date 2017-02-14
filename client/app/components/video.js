import React from 'react'
import {convertVideo} from '../utils/convert_video.js'
import {CONVERT_VIDEO} from '../actions/actions.js'

const VideoComponent = React.createClass({

  convertVideo (e) {
    e.preventDefault()
    if (this.refs.id.value !== "") {
      convertVideo(this.refs.originalUrl.value, this.refs.id.value).then((path) => {
        console.log("server res", path)
        this.props.dispatch(CONVERT_VIDEO(path))
      })
    }
    this.refs.originalUrl.value = ""
    this.refs.id.value = ""
	},

  // initAudio () {
  //   let audio = this.refs.audio
  //   // audio.crossOrigin = 'anonymous';
  //   console.log(audio)
  //   let boost;
  //   let analyser;

  //   //ANIMATION
  //   let animate = function () {
  //     window.requestAnimationFrame(animate);
  //     let fbcArray = new Uint8Array(analyser.frequencyBinCount); //audio frequency data to array
  //     analyser.getByteFrequencyData(fbcArray);
  //     boost = fbcArray; // --> length = 1024
  //     console.log(boost)
  //     // --> new AudioContext() --> createAnalyser() --> getByteFrequencyData(frequency array)
  //   };

  //   //INIT
  //   let initMp3Player = function () {
  //     // console.log(document.domain)
  //     // document.domain = "http://res.cloudinary.com"
  //     let context = new AudioContext();
  //     analyser = context.createAnalyser(); // --> getByteFrequencyData
  //     // Re-route audio playback into the processing graph of the AudioContext
  //     let source = context.createMediaElementSource(audio);
  //     console.log(source)
  //     // source.connect(analyser);
  //     // analyser.connect(context.destination);
  //     // animate(); //call animation
  //   };

  //   initMp3Player()
  // },

	render() {
    return (
      <div>
        <p>convert from url</p>
        <form onSubmit={this.convertVideo}>
          url
          <input type="text" ref="originalUrl"></input>
          id
          <input type="text" ref="id"></input>
          <button>convert</button>
        </form>
        <iframe src={"http://localhost:4001/" + this.props.videoSource}></iframe>
      </div>
    )
	}
})

export default VideoComponent;