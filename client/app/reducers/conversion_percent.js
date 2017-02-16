export function conversionPercent (state=null, action) {
  if(action.type === 'UPDATE_PERCENT') {
    return action.payload
	}
	return state;
}