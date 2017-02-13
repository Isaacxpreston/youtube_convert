import React from 'react'
import {convertVideo} from '../utils/convert_video.js'

const VideoComponent = React.createClass({

  convertVideo (e) {
    e.preventDefault()
    convertVideo(this.refs.originalUrl.value)
    this.refs.originalUrl.value = ""
	},

	render() {
    return (
      <div>
        <p>convert from url</p>
        <form onSubmit={this.convertVideo}>
          <input type="text" ref="originalUrl"></input>
          <button>convert</button>
        </form>
      </div>
    )
	}
})

export default VideoComponent;