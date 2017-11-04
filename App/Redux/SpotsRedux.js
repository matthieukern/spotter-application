import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  spotRequest: ['payload'],
  spotList: ['payload'],
  spotCreate: ['payload'],
  spotSuccess: ['data'],
  spotListSuccess: ['list'],
  spotFailure: ['error']
})

export const SpotTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  list: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

// request single report
export const request = (state, {payload}) =>
  state.merge({ fetching: true, data: null, payload })

// request the data from an api
export const list = (state, {payload}) =>
  state.merge({ fetching: true, list: null, data: null })

export const create = (state, {payload}) => state.merge({fetching: true, data: null, payload})

// successful api lookup
export const success = (state, {data}) => state.merge({fetching: false, error: null, payload: null, data})

export const listSuccess = (state, {list}) => state.merge({fetching: false, error: null, payload: null, list})

// Something went wrong somewhere.
export const failure = (state, {error}) =>
  state.merge({ fetching: false, error, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SPOT_LIST]: list,
  [Types.SPOT_REQUEST]: request,
  [Types.SPOT_LIST_SUCCESS]: listSuccess,
  [Types.SPOT_SUCCESS]: success,
  [Types.SPOT_FAILURE]: failure,
  [Types.SPOT_CREATE]: create
})
