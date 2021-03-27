import {
  TOGGLE_SIDE_BAR_MENU_RIGHT,
  CLOSE_SIDE_BAR_MENU_RIGHT,
  OPEN_SIDE_BAR_MENU_RIGHT,
} from '../constants/uiConstants'

export const toggleSideBarReducer = (
  state = { showSideBar: false },
  action
) => {
  switch (action.type) {
    case TOGGLE_SIDE_BAR_MENU_RIGHT:
      return { showSideBar: !state.showSideBar }
    case CLOSE_SIDE_BAR_MENU_RIGHT:
      return { showSideBar: false }
    case OPEN_SIDE_BAR_MENU_RIGHT:
      return { showSideBar: true }
    default:
      return state
  }
}
