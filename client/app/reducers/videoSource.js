export function videoSource (state= "http://res.cloudinary.com/isaacxpreston/video/upload/v1486982266/vzi2dvbfd8bxfwz2sggj.mp4", action) {
  if(action.type === 'CONVERT_VIDEO') {
    return action.payload
	}
	return state;
}