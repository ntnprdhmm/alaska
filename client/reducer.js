const initialState = {
  n: 0,
  sideNavOpen: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return Object.assign({}, state, {n: state.n+1})
    case 'REMOVE':
      return Object.assign({}, state, {n: state.n-1})
    case 'TOGGLE_SIDE_NAV':
      return Object.assign({}, state, {
        sideNavOpen: action.value !== undefined ? action.value : !state.sideNavOpen
      })
    default:
      return state
  }
}

export default reducer
