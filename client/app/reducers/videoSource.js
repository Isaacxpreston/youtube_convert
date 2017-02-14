export function videoSource (state= "test", action) {
  if(action.type === 'CONVERT_VIDEO') {
    return action.payload
	}
	return state;
}