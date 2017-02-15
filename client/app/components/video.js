import React from 'react'
import {convertVideo, postToHeroku} from '../utils/convert_video.js'
import {CONVERT_VIDEO} from '../actions/actions.js'

const styles = {
  div: {
    position: "absolute",
    "zIndex": 2, 
    top: 0,
    left: 0,
    right: 0,
    width: "400px",
    height: "300px"
  },
  iframe: {
    border: "1px solid transparent",
    position: "absolute",
    "zIndex": -9999,
    top: -1,
    left: -1,
    height: "100%",
    width: "100%"
  }
}

const VideoComponent = React.createClass({

  convertVideo (e) {
    e.preventDefault()
    postToHeroku().then((res) => {
      console.log("from video component", res)
    })
    // if (this.refs.id.value !== "") {
    //   convertVideo(this.refs.originalUrl.value, this.refs.id.value).then((path) => {
    //     console.log("server res", path)
    //     this.props.dispatch(CONVERT_VIDEO(path))
    //   })
    // }
    // this.refs.originalUrl.value = ""
    // this.refs.id.value = ""
	},

	render() {
    return (
      <div>
        <div style={styles.div}>
        <form onSubmit={this.convertVideo}>
          <input type="text" placeholder="youtube url" ref="originalUrl"></input>
          <br />
          <input type="text" maxLength="10" placeholder="display text" ref="id"></input>
          <br />
          <button>convert</button>
        </form>
        </div>
        <iframe style={styles.iframe} src={"http://localhost:4001/" + this.props.videoSource}></iframe>
      </div>
    )
	}
})

export default VideoComponent;