import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import Base64 from '../Lib/Base64'

// attempts to login
export function * login (api, {email, password}) {
  if (!password || !email || password === '' || email === '') {
    yield put(LoginActions.loginFailure({message: 'Email ou mot de passe invalide'}))
  } else {
    try {
      const tok = Base64.btoa(email + ':' + password)
      api.setAuthParams(tok)
      const res = yield call(api.auth.login, {})
      if (res.ok) {
        yield put(LoginActions.loginSuccess(res.data.user.email, res.data.token, false))
      } else {
        yield put(LoginActions.loginFailure({message: 'Login failed'}))
      }
    } catch (error) {
      yield put(LoginActions.loginFailure({message: error}))
    }
  }
}
