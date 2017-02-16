export function CONVERT_VIDEO (url) {
	return {
		type: 'CONVERT_VIDEO',
    payload: url
	}
}

export function UPDATE_PERCENT (str) {
	return {
		type: 'UPDATE_PERCENT',
    payload: str
	}
}