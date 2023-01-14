const INITIAL_STATE = {
    experienceList: [],
    error: null,
    fetching: false,
    fetched: false
  }
  
  export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'GET_EXPERIENCES_PENDING':
      case 'ADD_EXPERIENCE_PENDING':
      case 'SAVE_EXPERIENCE_PENDING':
      case 'DELETE_EXPERIENCE_PENDING':
        return { ...state, error: null, fetching: true, fetched: false }
      case 'GET_EXPERIENCES_FULFILLED':
      case 'ADD_EXPERIENCE_FULFILLED':
      case 'SAVE_EXPERIENCE_FULFILLED':
      case 'DELETE_EXPERIENCE_FULFILLED':
        return { ...state, experienceList: action.payload, error: null, fetching: false, fetched: true }
      case 'GET_EXPERIENCES_REJECTED':
      case 'ADD_EXPERIENCE_REJECTED':
      case 'SAVE_EXPERIENCE_REJECTED':
      case 'DELETE_EXPERIENCE_REJECTED':
        return { ...state, experienceList: [], error: action.payload, fetching: false, fetched: true }
      default:
        return state
    }
  }
  