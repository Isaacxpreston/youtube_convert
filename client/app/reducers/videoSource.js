export function videoSource (state= "weeknd", action) {
  if(action.type === 'CONVERT_VIDEO') {
    return action.payload
	}
	return state;
}