import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userCreate: ['payload'],
  userUpdate: ['payload'],
  userRequest: ['force'],
  userSuccess: ['data'],
  userFailure: ['error'],
  userRemove: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  force: false,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

// create identity in api
export const create = (state, { payload }) => state.merge({ fetching: true, payload, error: null })

// update identity in api
export const update = (state, { payload }) => state.merge({ fetching: true, payload, error: null })

// get identity from local or api
export const request = (state, {force}) => state.merge({ fetching: true, force, error: null })

// successful api lookup
export const success = (state, action) => {
  if (_.isEmpty(action)) {
    return state.merge({force: false})
  }
  const { data } = action
  return state.merge({ fetching: false, error: null, data, payload: null, force: false })
}

// Something went wrong somewhere.
export const failure = (state, {error}) => state.merge({ fetching: false, error, data: null })

// Reinitialise state
export const remove = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_CREATE]: create,
  [Types.USER_UPDATE]: update,
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.USER_REMOVE]: remove
})

/* ------------- Selectors ------------- */

// Force user request?
export const force = (userState: Object) => {
  return userState.force
}
