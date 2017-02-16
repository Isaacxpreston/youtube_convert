import React from 'react'
import {convertVideo} from '../utils/convert_video.js'
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
}

const UploadForm = React.createClass({
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
      <div style={styles.div}>
        <form onSubmit={this.convertVideo}>
          <input type="text" placeholder="youtube url" ref="originalUrl"></input>
          <br />
          <input type="text" maxLength="10" placeholder="display text" ref="id"></input>
          <br />
          <button>convert</button>
        </form>
      </div>
    )
	}
})

export default UploadForm;