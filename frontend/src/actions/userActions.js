import axios from 'axios'
import { RESET_MY_ORDERS } from '../constants/orderConstants'
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
  GET_USER_BY_ID_FAIL,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_REQUEST,
} from '../constants/userConstants'

const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const user = {
      email,
      password,
    }
    const { data } = await axios.post('/api/users/login', user, config)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const userLogout = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('userAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: USER_LOGOUT })

  dispatch({ type: RESET_MY_ORDERS })
}

const registerUser = (email, password, name) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/users/signup',
      { email, password, name },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error,
    })
  }
}

const updateUser = (email, password, name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      '/api/users/profile',
      { email, password, name },
      config
    )

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error,
    })
  }
}

const AdminGetAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_USERS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/users/admin/users', config)

    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: error,
    })
  }
}

const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
        id,
      },
    }

    await axios.delete('/api/users/admin/users', config)

    dispatch({
      type: DELETE_USER_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error,
    })
  }
}

const adminGetUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_BY_ID_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
        id,
      },
    }
    const { data } = await axios.get(`/api/users/admin/users/${id}`, config)
    dispatch({
      type: GET_USER_BY_ID_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_USER_BY_ID_FAIL,
      payload: error,
    })
  }
}

const adminUpdateUserDetails = (user, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_USER_BY_ID_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
        id,
      },
    }

    const { data } = await axios.put(
      `/api/users/admin/users/${id}`,
      user,
      config
    )

    dispatch({
      type: UPDATE_USER_BY_ID_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_USER_BY_ID_FAIL,
      payload: error,
    })
  }
}

export {
  userLogin,
  userLogout,
  registerUser,
  updateUser,
  AdminGetAllUsers,
  deleteUser,
  adminGetUserDetails,
  adminUpdateUserDetails,
}
