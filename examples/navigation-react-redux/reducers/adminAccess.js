import * as ActionTypes from '../constants/ActionTypes'

const DENIED = 'DENIED'

const adminAccess = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.ACCESS_DENIED:
      return DENIED
    default:
      return state
  }
}

export default adminAccess
