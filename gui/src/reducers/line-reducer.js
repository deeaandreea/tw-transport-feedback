const INITIAL_STATE = {
    lineList: [],
    error: null,
    fetching: false,
    fetched: false
  }
  
  export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'GET_LINES_PENDING':
      case 'ADD_LINE_PENDING':
      case 'SAVE_LINE_PENDING':
      case 'DELETE_LINE_PENDING':
        return { ...state, error: null, fetching: true, fetched: false }
      case 'GET_LINES_FULFILLED':
      case 'ADD_LINE_FULFILLED':
      case 'SAVE_LINE_FULFILLED':
      case 'DELETE_LINE_FULFILLED':
        return { ...state, lineList: action.payload, error: null, fetching: false, fetched: true }
      case 'GET_LINES_REJECTED':
      case 'ADD_LINE_REJECTED':
      case 'SAVE_LINE_REJECTED':
      case 'DELETE_LINE_REJECTED':
        return { ...state, lineList: [], error: action.payload, fetching: false, fetched: true }
      default:
        return state
    }
  }