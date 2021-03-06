import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_BY_ID_REQUEST,
  UPDATE_USER_BY_ID_SUCCESS,
  UPDATE_USER_BY_ID_FAIL,
  UPDATE_USER_BY_ID_RESET,
  GET_USER_BY_ID_FAIL,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: false }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: true,
        success: true,
        userInfo: action.payload,
      }
    case USER_LOGIN_FAIL:
      return { ...state, loading: true, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: false }
    case USER_REGISTER_SUCCESS:
      return { loading: true, userRegisterInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: false }
    case USER_UPDATE_SUCCESS:
      return { loading: true, success: true, userInfo: action.payload }
    case USER_UPDATE_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}

export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { ...state, loading: true }
    case GET_ALL_USERS_SUCCESS:
      return { loading: false, success: true, users: action.payload }
    case GET_ALL_USERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: false }
    case DELETE_USER_SUCCESS:
      return { loading: true, success: true }
    case DELETE_USER_FAIL:
      return { loading: true, success: false }
    default:
      return state
  }
}

export const adminUpdateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_BY_ID_REQUEST:
      return { loading: false }
    case UPDATE_USER_BY_ID_SUCCESS:
      return { loading: true, success: true, userInfo: action.payload }
    case UPDATE_USER_BY_ID_FAIL:
      return { loading: true, error: action.payload }
    case UPDATE_USER_BY_ID_RESET:
      return {}
    default:
      return state
  }
}

export const adminGetUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_BY_ID_REQUEST:
      return { ...state, loading: false }
    case GET_USER_BY_ID_SUCCESS:
      return { loading: true, success: true, user: action.payload }
    case GET_USER_BY_ID_FAIL:
      return { loading: true, error: action.payload }
    case GET_USER_BY_ID_RESET:
      return {}
    default:
      return state
  }
}
