// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://api-spotter.herokuapp.com/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const setToken = (token) => api.setHeaders({'Authorization': 'Bearer ' + token})
  const setAuthParams = (b64) => api.setHeaders({'Authorization': 'Basic ' + b64})

  const auth = {
    login: params => api.post('auth/', params),
  }

  const users = {
    create: (data) => api.post('users', data),
    me: () => api.get('users/me')
  }

  const spot = {
    create: (data) => api.post('spots', data),
    list: (data) => api.get('spots', data)
  }

  return {
    setToken,
    setAuthParams,
    auth,
    users,
    spot
  }
}

// let's return back our create method as the default.
export default {
  create
}
