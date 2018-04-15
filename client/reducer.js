const initialState = {
  n: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return Object.assign({}, state, {n: state.n+1})
    case 'REMOVE':
      return Object.assign({}, state, {n: state.n-1})
    default:
      return state
  }
}

export default reducer
