import React from 'react'
import {render} from 'react-dom'
import {Router, Link, browserHistory, Route, IndexRoute} from 'react-router'
import {Provider} from 'react-redux'
import './stylesheets/stylesheet.css'
import store, {history} from './store.js'
import MainWrapper from './components/mainwrapper.js'

const Root = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="*" component={MainWrapper} />
		</Router>
	</Provider>
)

render(Root, document.getElementById('app'))