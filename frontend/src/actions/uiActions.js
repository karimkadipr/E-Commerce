import {
  TOGGLE_SIDE_BAR_MENU_RIGHT,
  CLOSE_SIDE_BAR_MENU_RIGHT,
  OPEN_SIDE_BAR_MENU_RIGHT,
} from '../constants/uiConstants'

const toggleSideMenuRight = () => (dispatch) => {
  dispatch({
    type: TOGGLE_SIDE_BAR_MENU_RIGHT,
  })
}

const closeSideMenuRight = () => (dispatch) => {
  dispatch({
    type: CLOSE_SIDE_BAR_MENU_RIGHT,
  })
}

const openSideMenuRight = () => (dispatch) => {
  dispatch({
    type: OPEN_SIDE_BAR_MENU_RIGHT,
  })
}

export { toggleSideMenuRight, closeSideMenuRight, openSideMenuRight }
