export function videoSource (state= "fatima", action) {
  if(action.type === 'CONVERT_VIDEO') {
    return action.payload
	}
	return state;
}