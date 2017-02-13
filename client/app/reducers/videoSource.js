export function videoSource (state= "./asdf.mp4", action) {
  if(action.type === 'CONVERT_VIDEO') {
    return action.payload
	}
	return state;
}