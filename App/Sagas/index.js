import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'
import { UserTypes } from '../Redux/UserRedux'
import { SpotTypes } from '../Redux/SpotsRedux'

/* ------------- Sagas ------------- */

import { login } from './LoginSagas'
import { create as register, me, update as updateUser } from './UserSaga'
import { create as createSpot, list as listSpot } from './SpotsSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

export const getToken = (state) => {
  return state.login.token
}

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(UserTypes.USER_CREATE, register, api),
    takeLatest(UserTypes.USER_REQUEST, me, api),
    takeLatest(UserTypes.USER_UPDATE, updateUser, api),
    takeLatest(SpotTypes.SPOT_CREATE, createSpot, api),
    takeLatest(SpotTypes.SPOT_LIST, listSpot, api)
  ])
}
