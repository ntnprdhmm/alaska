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

export function loginSuccess (jwt) {
  return {type: 'LOGIN_SUCCESS', jwt}
}

export function registerSuccess (jwt) {
  return {type: 'LOGIN_SUCCESS', jwt}
}

export const login = (body) => {
  return dispatch => {
    myFetch('/api/auth/login', 'POST', body)
      .then(jwt => dispatch(loginSuccess(jwt)))
      .catch(_ => dispatch(createToast('error', 'Failed to login')))
  }
}

export const register = (body) => {
  return dispatch => {
    myFetch('/api/auth/register', 'POST', body)
      .then(jwt => dispatch(registerSuccess(jwt)))
      .catch(_ => dispatch(createToast('error', 'Failed to register')))
  }
}
