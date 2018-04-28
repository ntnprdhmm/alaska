const initialState = {
  showSideNav: false,
  showLoginModal: false,
  toasts: [],
  jwtPayload: null,
  lastSubmission: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDE_NAV':
      return Object.assign({}, state, {
        showSideNav: !state.showSideNav
      })
    case 'TOGGLE_LOGIN_MODAL':
      return Object.assign({}, state, {
        showLoginModal: !state.showLoginModal
      })
    case 'REGISTER_SUCCESS':
      return Object.assign({}, state, {
        showLoginModal: false
      })
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        showLoginModal: false,
        jwtPayload: action.jwtPayload
      })
    case 'LOGOUT':
      return Object.assign({}, state, {
        jwtPayload: null
      })
    case 'CLOSE_TOAST':
      return Object.assign({}, state, {
        toasts: state.toasts.filter((e, i) => i !== action.key)
      })
    case 'CREATE_TOAST':
      return Object.assign({}, state, {
        toasts: state.toasts.concat([{type: action.toastType, text: action.toastText}])
      })
    case 'LOAD_LAST_SUBMISSION':
      return Object.assign({}, state, {
        lastSubmission: action.sub
      })
    default:
      return state
  }
}

export default reducer
