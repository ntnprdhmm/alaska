const jwtDecode = require('jwt-decode')
import { myFetch } from './helpers/fetch'

export function toggleSideNav () {
  return {type: 'TOGGLE_SIDE_NAV'}
}

export function toggleLoginModal () {
  return {type: 'TOGGLE_LOGIN_MODAL'}
}

export function closeToast (key) {
  return {type: 'CLOSE_TOAST', key}
}

export function createToast (toastType, toastText) {
  return {type: 'CREATE_TOAST', toastType, toastText}
}

export function loginSuccess (jwt, jwtPayload) {
  localStorage.setItem('jwt', jwt)
  return {type: 'LOGIN_SUCCESS', jwt, jwtPayload}
}

export function registerSuccess () {
  return {type: 'REGISTER_SUCCESS'}
}

export function logout () {
  localStorage.removeItem('jwt')
  return {type: 'LOGOUT'}
}

export function loadLastSubmission (sub) {
  return {type: 'LOAD_LAST_SUBMISSION', sub}
}

export const submit = (value) => {
  return dispatch => {
    myFetch('/api/submission', 'POST', {value})
      .then(response => {
        response.json().then(body => {
          dispatch(createToast(response.ok ? 'success' : 'error', body.message))
          if (response.ok) {
            localStorage.setItem('lastSubmission', JSON.stringify(body.sub))
            dispatch(loadLastSubmission(body.sub))
          }
        })
      })
      .catch(_ => dispatch(createToast('error', 'Fetch error')))
  }
}

export const logoutUI = () => {
  return dispatch => {
    dispatch(logout())
    dispatch(createToast('success', 'Bye !'))
  }
}

export const loginBack = (jwt) => {
  const payload = jwtDecode(jwt)
  return dispatch => {
    dispatch(loginSuccess(jwt, payload))
    dispatch(createToast('success', `Welcome back ! Your logged as ${payload.email} `))
  }
}

export const login = (body) => {
  return dispatch => {
    myFetch('/api/auth/login', 'POST', body)
      .then(response => {
        response.json().then(body => {
          if (response.ok) dispatch(loginSuccess(body.token, jwtDecode(body.token)))
          dispatch(createToast(response.ok ? 'success' : 'error', body.message))
        })
      })
      .catch(_ => dispatch(createToast('error', 'Fetch error')))
  }
}

export const register = (body) => {
  return dispatch => {
    myFetch('/api/auth/register', 'POST', body)
      .then(response => {
        response.json().then(body => {
          if (response.ok) dispatch(registerSuccess())
          dispatch(createToast(response.ok ? 'success' : 'error', body.message))
        })
      })
      .catch(_ => dispatch(createToast('error', 'Fetch error')))
  }
}

export const sendVerificationtToken = (token) => {
  return dispatch => {
    myFetch('/api/auth/register/callback', 'POST', {token})
      .then(response => {
        response.json().then(body => {
          dispatch(createToast(response.ok ? 'success' : 'error', body.message))
        })
      })
      .catch(_ => dispatch(createToast('error', 'Fetch error')))
  }
}
