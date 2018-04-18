const jwtDecode = require('jwt-decode')
import { myFetch } from './helpers/fetch'

export function toggleSideNav (value) {
  return {type: 'TOGGLE_SIDE_NAV', value}
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
  return {type: 'LOGIN_SUCCESS', jwt, jwtPayload}
}

export function registerSuccess () {
  return {type: 'REGISTER_SUCCESS'}
}

export function logout () {
  return {type: 'LOGOUT'}
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
      .then(data => data.json())
      .then(data => dispatch(loginSuccess(data.token, jwtDecode(data.token))))
      .then(_ => dispatch(createToast('success', 'You are now logged.')))
      .catch(_ => dispatch(createToast('error', 'Failed to login')))
  }
}

export const register = (body) => {
  return dispatch => {
    myFetch('/api/auth/register', 'POST', body)
      .then(_ => dispatch(registerSuccess()))
      .then(_ => dispatch(createToast('success', 'Account created ! Check ' +
        'your emails to verify the provided email address.')))
      .catch(_ => dispatch(createToast('error', 'Failed to register')))
  }
}

export const sendVerificationtToken = (token) => {
  return dispatch => {
    myFetch('/api/auth/register/callback', 'POST', {token})
      .then(_ => dispatch(createToast('success', 'Account validated ! Now, you can log in.')))
      .catch(_ => dispatch(createToast('error', 'Email verification failed')))
  }
}
