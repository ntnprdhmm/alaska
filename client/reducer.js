const initialState = {
  showSideNav: false,
  showLoginModal: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDE_NAV':
      return Object.assign({}, state, {
        showSideNav: action.value !== undefined ? action.value : !state.sideNavOpen
      })
    case 'TOGGLE_LOGIN_MODAL':
      return Object.assign({}, state, {
        showLoginModal: !state.showLoginModal
      })
    default:
      return state
  }
}

export default reducer
