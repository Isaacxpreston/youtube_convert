export function videoSource (state= "https://res.cloudinary.com/demo/video/upload/v1427018743/ygzxwxmflekucvqcrb8c.mp4", action) {
  if(action.type === 'CONVERT_VIDEO') {
    return action.payload
	}
	return state;
}