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
        <iframe height={window.innerHeight} width={window.innerWidth} src={"http://localhost:4001/" + this.props.videoSource}></iframe>
      </div>
    )
	}
})

export default VideoComponent;