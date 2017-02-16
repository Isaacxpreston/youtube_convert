export function videoSource (state= "", action) {
  if(action.type === 'CONVERT_VIDEO') {
    return action.payload
	}
	return state;
}