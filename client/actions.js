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

export const login = (body) => {
  return dispatch => {
    myFetch('/api/auth/login', 'POST', body)
      .then(jwt => dispatch(loginSuccess(jwt)))
      .then(jwt => dispatch(createToast('success', 'You are now logged.')))
      .catch(_ => dispatch(createToast('error', 'Failed to login')))
  }
}

export const register = (body) => {
  return dispatch => {
    myFetch('/api/auth/register', 'POST', body)
      .then(jwt => dispatch(createToast('success', 'Account created ! Check ' +
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
