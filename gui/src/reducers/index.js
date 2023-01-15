import { combineReducers } from 'redux'
import experience from './experience-reducer'
import line from './line-reducer'
import user from './user-reducer'
import auth from './auth-reducer'

export default combineReducers({
  experience,
  line,
  user,
  auth
})
