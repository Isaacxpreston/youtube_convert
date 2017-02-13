import React from 'react'
import {convertVideo} from '../utils/convert_video.js'
import {CONVERT_VIDEO} from '../actions/actions.js'

const VideoComponent = React.createClass({

  convertVideo (e) {
    e.preventDefault()
    if (this.refs.id.value !== "") {
      convertVideo(this.refs.originalUrl.value, this.refs.id.value).then((path) => {
        this.props.dispatch(CONVERT_VIDEO(path)) //change state to path props.videoSource
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
        <video src="https://res.cloudinary.com/demo/video/upload/v1427018743/ygzxwxmflekucvqcrb8c.mp4" controls>
        </video>
      </div>
    )
	}
})

export default VideoComponent;