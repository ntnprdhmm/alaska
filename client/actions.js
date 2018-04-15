export function add () {
  return {
    type: 'ADD'
  }
}

export function remove () {
  return {
    type: 'REMOVE'
  }
}

export function toggleSideNav (value) {
  return {
    type: 'TOGGLE_SIDE_NAV',
    value
  }
}
