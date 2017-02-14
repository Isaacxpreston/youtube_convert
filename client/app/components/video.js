import React from 'react'
import {convertVideo} from '../utils/convert_video.js'
import {CONVERT_VIDEO} from '../actions/actions.js'

const styles = {
  div: {
    position: "absolute",
    color: "white",
    "zIndex": 2,
    top: 0,
    left: 0,
    right: 0,
    width: "100%"
  },
  iframe: {
    border: "1px solid transparent",
    position: "absolute",
    "zIndex": -9999,
    top: -1,
    left: -1,
    height: "100%",
    width: "100%"
  },
  backgroundText: {
    opacity: 0.25,
    "position": "absolute",
    "text-transform": "uppercase",
    color: "darkred",
    top: "50px",
    left: "50px",
    "font-size": "500px",
    transform: "scaleY(1.5)"
  }
}

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

	render() {
    return (
      <div>
        <div style={styles.div}>
        <form onSubmit={this.convertVideo}>
          <input type="text" placeholder="youtube url" ref="originalUrl"></input>
          <input type="text" placeholder="name" ref="id"></input>
          <button>convert</button>
        </form>
        </div>
        <div style={styles.backgroundText}>
          test
        </div>
        <iframe style={styles.iframe} src={"http://localhost:4001/" + this.props.videoSource}></iframe>
      </div>
    )
	}
})

export default VideoComponent;