export function videoSource (state= "testing", action) {
  if(action.type === 'CONVERT_VIDEO') {
    return action.payload
	}
	return state;
}