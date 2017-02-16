import React from 'react'
import PubNub from 'pubnub'
import {convertVideo} from '../utils/convert_video.js'
import {CONVERT_VIDEO, UPDATE_PERCENT} from '../actions/actions.js'

// const pubnub = new PubNub({
//     subscribeKey: "sub-c-6fa72432-f415-11e6-b0ac-0619f8945a4f",
//     publishKey: "pub-c-6d1cc120-4d11-4db6-8d32-e617c064a066",
//     secretKey: "sec-c-NTk2Y2JhZDAtMzc3Ni00OTQ2LTkxZDUtZGIxM2QzNmRjNmVh",
//     ssl: true
// })

// pubnub.addListener({
//   message: function(m) {
//     console.log(m.message)
//     // this.props.dispatch(UPDATE_PERCENT(m.message))
//   }
// })

// pubnub.subscribe({
//     channels: ["convert_percent"]
// })

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
  percent: {
    color: "white"
  }
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
    return (
      <div style={styles.div}>
        <div style={styles.percent}>
          {this.props.conversionPercent}
        </div>
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