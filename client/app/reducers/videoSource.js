export function videoSource (state= "converter", action) {
  if(action.type === 'CONVERT_VIDEO') {
    return action.payload
	}
	return state;
}