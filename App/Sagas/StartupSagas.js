import { put, select } from 'redux-saga/effects'
import GithubActions from '../Redux/GithubRedux'
import { is } from 'ramda'

// exported to make available for tests
export const selectAvatar = (state) => state.github.avatar

// process STARTUP actions
export function * startup (action) {

}
