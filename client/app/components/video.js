import React from 'react'

const styles = {
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
	render () {
    return (
      <div>
        <iframe style={styles.iframe} src={"http://localhost:4001/" + this.props.videoSource}></iframe>
      </div>
    )
	}
})

export default VideoComponent;