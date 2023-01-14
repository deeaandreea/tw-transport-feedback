import { combineReducers } from 'redux'
import experience from './experience-reducer'
import line from './line-reducer'
import user from './user-reducer'

export default combineReducers({
  experience,
  line,
  user
})
