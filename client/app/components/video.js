import React from 'react'
import {convertVideo} from '../utils/convert_video.js'
import {CONVERT_VIDEO} from '../actions/actions.js'

const styles = {
  div: {
    display: "none",
    opacity: 0
  },
  div2: {
    position: "absolute",
    "z-index": 2,
    top: 0,
    left: 0,
    right: 0,
    margin: "auto",
    background: "red",
    width: "100%"
  },
  iframe: {
    border: "1px solid transparent",
    position: "absolute",
    left: 0,
    height: "100%",
    width: "100%"
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
        <p>convert from url</p>
        <form onSubmit={this.convertVideo}>
          url
          <input type="text" ref="originalUrl"></input>
          id
          <input type="text" ref="id"></input>
          <button>convert</button>
        </form>
        </div>
        <iframe style={styles.iframe} src={"http://localhost:4001/" + this.props.videoSource}></iframe>
      </div>
    )
	}
})

export default VideoComponent;