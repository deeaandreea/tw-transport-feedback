const INITIAL_STATE = {
    auth: null,
    error: null,
    fetching: false,
    fetched: false
  }
  
  export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'LOGIN_PENDING':
      case 'LOGOUT_PENDING':
      case 'REGISTER_PENDING':
        return { ...state, error: null, fetching: true, fetched: false }
      case 'LOGIN_FULFILLED':
      case 'LOGOUT_FULFILLED':
      case 'REGISTER_FULFILLED':
        return { ...state, auth: action.payload, error: null, fetching: false, fetched: true }
      case 'LOGIN_REJECTED':
      case 'LOGOUT_REJECTED':
      case 'REGISTER_REJECTED':
        return { ...state, auth: null, error: action.payload, fetching: false, fetched: true }
      default:
        return state
    }
  }

export function authApp(store={}, action) {
  return {
      auth: reducer(store.auth, action)
  }
}
