/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import {getToken} from './'
import UserTransform from '../Transforms/ApiUserTransform'
import ErrorTransform from '../Transforms/ApiErrorTransform'

const getIdentity = (state) => state.user.data

export function * me (api, {force}) {
  const identity = yield select(getIdentity)

  if (identity && !force) {
    console.log('identity', identity)
    yield put(UserActions.userSuccess(identity))
  }
  else {
    const token = yield select(getToken)
    api.setToken(token)
    const response = yield call(api.users.me)

    if (response.ok) {
      var data = response.data
      console.log('data', data)
      yield put(UserActions.userSuccess(data))
    } else {
      yield put(UserActions.userFailure(ErrorTransform(response)))
    }
  }
}

export function * create (api, {payload}) {
  let user = UserTransform.validate(payload)
  if (!user.ok) {
    return yield put(UserActions.userFailure(user))
  }
  let response = yield call(api.users.create, user)
  console.log(JSON.stringify(response, null, 4))
  if (response.ok) {
    yield put(UserActions.userSuccess(user))
  } else {
    yield put(UserActions.userFailure(ErrorTransform(response)))
  }
}

export function * update (api, {payload}) {
  const token = yield select(getToken)
  api.setToken(token)
  const response = yield call(api.users.update, payload)

  if (response.ok) {
    yield put(UserActions.userSuccess(response.data))
  } else {
    yield put(UserActions.userFailure(ErrorTransform(response)))
  }
}
