import React from 'react'
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {signUp} from '../actions/actions.js'
import VideoComponent from './video.js'
import UploadForm from './upload_form.js'

//todo -
//hamburger menu
	//upload
		//url
		//text
		//name
	//recent --optional
		//list
//create shareable/navigatable urls --optional
//top left text
//cool logo
//landing page
	//demo buttons
		//sfw
		//nsfw (bad words)

const styles = {
  div: {
    background: "navy",
		color: "white",
		position: "absolute",
		top: 300
  },
}

const Main = React.createClass({

	someAction () {
		this.props.dispatch(someAction())
	},
	
	signUp () {
		this.props.dispatch(signUp())
	},

	render() {
		return (
			<div>
				<UploadForm {...this.props} />
				<VideoComponent {...this.props} />
			</div>
		)
	}
})

function mapStatetoProps (state=[]) {
	return {
		videoSource: state.videoSource,
	}
}

const MainWrapper = connect(mapStatetoProps)(Main);

export default MainWrapper;