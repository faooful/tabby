import { combineReducers } from 'redux'

export default combineReducers({
  imageState
})

function imageState(state = 'STATIC', { type, payload }) {
  switch (type) {
    case 'SET_IMAGE_STATE':
      return payload.imageState

    default:
      return state
  }
}
