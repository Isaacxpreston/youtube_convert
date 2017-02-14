export function videoSource (state= "xxx", action) {
  if(action.type === 'CONVERT_VIDEO') {
    return action.payload
	}
	return state;
}