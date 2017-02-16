export function videoSource (state= "soundtrac", action) {
  if(action.type === 'CONVERT_VIDEO') {
    return action.payload
	}
	return state;
}