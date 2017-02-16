import React from 'react'
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import VideoComponent from './video.js'
import UploadForm from './upload_form.js'
import Landing from './landing_splash.js'

//todo -
//create shareable/navigatable urls
//cool logo
//landing page

const Main = React.createClass({
	render() {
		return (
			<div>
				<Landing {...this.props} />
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
const MainWrapper = connect(mapStatetoProps)(Main);
export default MainWrapper;