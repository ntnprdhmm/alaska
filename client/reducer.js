const initialState = {
  showSideNav: false,
  showLoginModal: false,
  showResetModal: false,
  toasts: [],
  jwtPayload: null,
  lastSubmission: null,
  resetToken: null,
  activeTab: 1,
  submissions1: [],
  submissions2: []
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
    case 'TOGGLE_RESET_MODAL':
      return Object.assign({}, state, {
        showResetModal: !state.showResetModal
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
    case 'HANDLE_RESET_TOKEN':
      return Object.assign({}, state, {
        resetToken: action.token,
        showResetModal: true
      })
    case 'FETCH_SUBMISSIONS_SUCCESS':
      return Object.assign({}, state, {
        submissions1: action.submissions.filter(s => s.stage === 1),
        submissions2: action.submissions.filter(s => s.stage === 2)
      })
    case 'SWITCH_LEADERBOARD_TAB':
      return Object.assign({}, state, {
        activeTab: state.activeTab === 1 ? 2 : 1
      })
    default:
      return state
  }
}

export default reducer
