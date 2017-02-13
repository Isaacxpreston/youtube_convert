import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import {videoSource} from './videoSource.js'

const appReducer = combineReducers({
  videoSource,
  routing: routerReducer
})

const reducer = (state, action) => {
  return appReducer(state, action)
}

export default reducer;