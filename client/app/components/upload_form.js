import React from 'react'
import PubNub from 'pubnub'
import {convertVideo} from '../utils/convert_video.js'
import {CONVERT_VIDEO, UPDATE_PERCENT} from '../actions/actions.js'

const styles = {
  div: {
    position: "absolute",
    "zIndex": 2, 
    bottom: 10,
    left: 20,
  },
  percent: {
    color: "white",
    "fontFamily": "sans-serif",
    "fontSize": "2em",
    "textTransform": "uppercase",
    "marginBottom": "25px"
  },
  input: {
    height: "40px",
    "fontSize": "1.2em",
    "textTransform": "uppercase",
    border: "none",
    background: "rgba(0, 0, 0, 0)",
    color: "white",
    outline: "none"
  },
  button: {
    "textAlign": "left",
    "paddingTop": "7px",
    "marginLeft": "-5px",
    height: "20px",
    "fontSize": "1.2em",
    "textTransform": "uppercase",
    border: "none",
    background: "rgba(0, 0, 0, 0)",
    color: "white",
    outline: "none"
  },
  img: {
    height: "24px",
    width: "24px",
    "paddingLeft": "10px"
  }
}

const UploadForm = React.createClass({
  convertVideo (e) {
    e.preventDefault()
    if (this.refs.id.value !== "" && this.refs.originalUrl.value !== "") {
      convertVideo(this.refs.originalUrl.value, this.refs.id.value).then((path) => {
        this.props.dispatch(CONVERT_VIDEO(path))
      })
    }
    this.refs.originalUrl.value = ""
    this.refs.id.value = ""
	},

  componentDidMount () {
    let dispatch = (m) => {
      this.props.dispatch(UPDATE_PERCENT(m.message))
    }
    this.pubnub = new PubNub({
      subscribeKey: "sub-c-6fa72432-f415-11e6-b0ac-0619f8945a4f",
      publishKey: "pub-c-6d1cc120-4d11-4db6-8d32-e617c064a066",
      secretKey: "sec-c-NTk2Y2JhZDAtMzc3Ni00OTQ2LTkxZDUtZGIxM2QzNmRjNmVh",
      ssl: true
    })
    this.pubnub.addListener({
      message: function(m) {
        dispatch(m)
      }
    })
    this.pubnub.subscribe({
        channels: ["convert_percent"]
    })
  },

	render() {
    if (this.props.conversionPercent === null || this.props.conversionPercent === " ") {
      return (
        <div style={styles.div}>
          <form onSubmit={this.convertVideo}>
            <input style={styles.input} type="text" placeholder="youtube url" ref="originalUrl"></input>
            <br />
            <input style={styles.input} type="text" maxLength="10" placeholder="display text" ref="id"></input>
            <br />
            <button style={styles.button}>convert</button>
          </form>
        </div>
      )
    } else {
      return (
        <div style={styles.div}>
          <div style={styles.percent}>
            {this.props.conversionPercent}
          </div>
        </div>
      )
    }
	}
})

export default UploadForm;