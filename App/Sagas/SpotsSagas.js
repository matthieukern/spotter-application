import { call, put, select } from 'redux-saga/effects'
import SpotActions from '../Redux/SpotsRedux'
import DateTransform from '../Transforms/MomentFromDate'
import ErrorTransform from '../Transforms/ApiErrorTransform'
import {getToken} from './'
import _ from 'lodash'

export function * list (api, {payload}) {
  const token = yield select(getToken)
  const response = yield call(api.spot.list, {access_token: token, near: [payload.latitude, payload.longitude], max_distance: 10000})

  console.log(JSON.stringify(response, null, 4))

  if (response.ok) {
    var reports = response.data
    _.each(reports, (report) => {
      if (report.createdAt) report.createdAt = DateTransform(report.createdAt)
    })
    yield put(SpotActions.spotListSuccess(reports))
  } else {
    yield put(SpotActions.spotFailure(ErrorTransform(response)))
  }
}

export function * create (api, {payload}) {
  const token = yield select(getToken)

  payload['access_token'] = token

  console.log('payload', payload)

  const response = yield call(api.spot.create, payload)

  if (response.ok) {
    yield put(SpotActions.spotSuccess(response.data))
  } else {
    yield put(SpotActions.spotFailure(ErrorTransform(response)))
  }
}
