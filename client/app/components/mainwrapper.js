import React from 'react'
// import {CONVERT_VIDEO, UPDATE_PERCENT} from '../actions/actions.js'
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
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

const Main = React.createClass({
	render() {
		return (
			<div>
				<UploadForm {...this.props} />
				<VideoComponent {...this.props} />
			</div>
		)
	}
})

function mapStatetoProps (state=null) {
	return {
		videoSource: state.videoSource,
		conversionPercent: state.conversionPercent
	}
}
// function mapDispatchToProps(dispatch) {
// 	return {
// 			UPDATE_PERCENT: (m) => dispatch(UPDATE_PERCENT(m)),
// 	};
// }
const MainWrapper = connect(mapStatetoProps)(Main);
export default MainWrapper;