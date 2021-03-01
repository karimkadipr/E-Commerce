import axios from 'axios'
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
  RESET_MY_ORDERS,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  MARK_AS_DELIVERED_REQUEST,
  MARK_AS_DELIVERED_SUCCESS,
  MARK_AS_DELIVERED_FAIL,
  DELETE_ORDER_BY_ID_REQUEST,
  DELETE_ORDER_BY_ID_SUCCESS,
  DELETE_ORDER_BY_ID_FAIL,
} from '../constants/orderConstants'
const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
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

    const { data } = await axios.post('/api/orders/shipping', order, config)

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error,
    })
  }
}

const getOrderById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ORDER_REQUEST,
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

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error,
    })
  }
}

const payOrder = (id, paymentResults) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAY_ORDER_REQUEST,
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

    await axios.put(`/api/orders/${id}`, paymentResults, config)

    dispatch({
      type: PAY_ORDER_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PAY_ORDER_FAIL,
      payload: error,
    })
  }
}

const getAllMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MY_ORDERS_REQUEST,
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

    const { data } = await axios.get('/api/orders/myOrders', config)

    dispatch({
      type: GET_MY_ORDERS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_MY_ORDERS_FAIL,
      payload: error,
    })
  }
}
const deleteMyOrders = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  await axios.delete('/api/orders/myOrders', config)

  dispatch({
    type: RESET_MY_ORDERS,
  })
}

const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_ORDERS_REQUEST,
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
    const { data } = await axios.get('/api/orders/admin/allOrders', config)

    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload: error,
    })
  }
}

const markAsDelivered = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MARK_AS_DELIVERED_REQUEST,
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

    await axios.put(`/api/orders/admin/${id}`, {}, config)

    dispatch({
      type: MARK_AS_DELIVERED_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: MARK_AS_DELIVERED_FAIL,
      payload: error,
    })
  }
}

const deleteOrderById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_ORDER_BY_ID_REQUEST,
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

    await axios.delete(`/api/orders/admin/order/${id}`, config)

    dispatch({
      type: DELETE_ORDER_BY_ID_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_BY_ID_FAIL,
      payload: error,
    })
  }
}
export {
  createOrder,
  getOrderById,
  payOrder,
  getAllMyOrders,
  deleteMyOrders,
  getAllOrders,
  markAsDelivered,
  deleteOrderById,
}
