import { merge } from './utils'

const TOGGLE_SIDEBAR = 'ui/TOGGLE_SIDEBAR'

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  }
}

const initialState = {
  isSidebarOpen: false,
}

export default function reducer(state = initialState, action = {}) {
  const { type } = action
  switch (type) {
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        isSidebarOpen: !state.isSidebarOpen,
      })
    default: return state
  }
}
