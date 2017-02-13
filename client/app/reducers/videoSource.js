export function videoSource (state= null, action) {
  if(action.type === 'CONVERT_VIDEO') {
    return action.payload
	}
	return state;
}