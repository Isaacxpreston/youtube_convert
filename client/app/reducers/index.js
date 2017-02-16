import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import {videoSource} from './videoSource.js'
import {conversionPercent} from './conversion_percent.js'

const appReducer = combineReducers({
  conversionPercent,
  videoSource,
  routing: routerReducer
})

const reducer = (state, action) => {
  return appReducer(state, action)
}

export default reducer;