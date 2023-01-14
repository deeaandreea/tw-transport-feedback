const INITIAL_STATE = {
    userList: [],
    error: null,
    fetching: false,
    fetched: false
  }
  
  export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'GET_USERS_PENDING':
      case 'ADD_USER_PENDING':
      case 'SAVE_USER_PENDING':
      case 'DELETE_USER_PENDING':
        return { ...state, error: null, fetching: true, fetched: false }
      case 'GET_USERS_FULFILLED':
      case 'ADD_USER_FULFILLED':
      case 'SAVE_USER_FULFILLED':
      case 'DELETE_USER_FULFILLED':
        return { ...state, userList: action.payload, error: null, fetching: false, fetched: true }
      case 'GET_USERS_REJECTED':
      case 'ADD_USER_REJECTED':
      case 'SAVE_USER_REJECTED':
      case 'DELETE_USER_REJECTED':
        return { ...state, userList: [], error: action.payload, fetching: false, fetched: true }
      default:
        return state
    }
  }