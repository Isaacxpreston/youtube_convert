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
    console.log(this.props.videoSource)
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
        <video src={this.props.videoSource} controls>
        </video>
      </div>
    )
	}
})

export default VideoComponent;