import React from 'react'
import {CONVERT_VIDEO} from '../actions/actions.js'

const styles = {
  main: {
    position: "absolute",
    bottom: 20,
    right: 20,
    fontSize: "2em",
    textTransform: "uppercase",
    fontFamily: "sans-serif",
    color: "white",
    zIndex: 3
  },
  small: {
    marginTop: "5px",
    fontSize: "0.25em"
  },
  hidden: {
    display: "none",
    opacity: 0
  }
}

const Landing = React.createClass({
  playDemo () {
    this.props.dispatch(CONVERT_VIDEO("convertre"))
	},
  
  playNSFWDemo () {
    this.props.dispatch(CONVERT_VIDEO("converter"))
	},

	render() {
    if (this.props.videoSource === "") {
      return (
        <div style={styles.main}>
          <span onClick={this.playDemo}>play demo</span>
          <br />
          <span style={styles.small} onClick={this.playNSFWDemo}>play nsfw (bad words) demo</span>
        </div>
      )
    } else {
      return (
        <div style={styles.hidden}>
        </div>
      )
    }
	}
})

export default Landing;