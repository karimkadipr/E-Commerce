import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_RESET,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_RESET,
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
  CREATE_ORDER_RESET,
  DELETE_ORDER_BY_ID_REQUEST,
  DELETE_ORDER_BY_ID_SUCCESS,
  DELETE_ORDER_BY_ID_FAIL,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true }
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_ORDER_RESET:
      return {}
    default:
      return state
  }
}

export const getOrderReducer = (
  state = { order: { shippingAddress: {}, orderItems: [] } },
  action
) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ORDER_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload }
    case GET_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload }
    case GET_ORDER_RESET:
      return { order: { shippingAddress: {}, orderItems: [] } }
    default:
      return state
  }
}

export const payOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_ORDER_REQUEST:
      return { loading: true }
    case PAY_ORDER_SUCCESS:
      return { loading: false, success: true }
    case PAY_ORDER_FAIL:
      return { loading: false, error: action.payload }
    case PAY_ORDER_RESET:
      return {}
    default:
      return state
  }
}

export const getMyOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_MY_ORDERS_REQUEST:
      return { loading: true, orders: [] }
    case GET_MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload }
    case GET_MY_ORDERS_FAIL:
      return { loading: false, error: action.payload }
    case RESET_MY_ORDERS:
      return { orders: [] }
    default:
      return state
  }
}

export const getAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return { loading: true, orders: [] }
    case GET_ALL_ORDERS_SUCCESS:
      return { loading: false, success: true, orders: action.payload }
    case GET_ALL_ORDERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const markAsDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_AS_DELIVERED_REQUEST:
      return { loading: true }
    case MARK_AS_DELIVERED_SUCCESS:
      return { loading: false, success: true }
    case MARK_AS_DELIVERED_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteOrderByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDER_BY_ID_REQUEST:
      return { loading: true }
    case DELETE_ORDER_BY_ID_SUCCESS:
      return { loading: false, success: true }
    case DELETE_ORDER_BY_ID_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
