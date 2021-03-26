import {
  ADD_ITEM_CAROUSEL_REQUEST,
  ADD_ITEM_CAROUSEL_SUCCESS,
  ADD_ITEM_CAROUSEL_FAIL,
  GET_ITEM_CAROUSEL_REQUEST,
  GET_ITEM_CAROUSEL_SUCCESS,
  GET_ITEM_CAROUSEL_FAIL,
  UPDATE_ITEM_CAROUSEL_REQUEST,
  UPDATE_ITEM_CAROUSEL_SUCCESS,
  UPDATE_ITEM_CAROUSEL_FAIL,
  UPDATE_ITEM_CAROUSEL_RESET,
  DELETE_ITEM_CAROUSEL_REQUEST,
  DELETE_ITEM_CAROUSEL_SUCCESS,
  DELETE_ITEM_CAROUSEL_FAIL,
  GET_ONE_ITEM_CAROUSEL_REQUEST,
  GET_ONE_ITEM_CAROUSEL_SUCCESS,
  GET_ONE_ITEM_CAROUSEL_FAIL,
} from '../constants/carouselConstants'

export const addItemCarouselReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM_CAROUSEL_REQUEST:
      return { loading: true }
    case ADD_ITEM_CAROUSEL_SUCCESS:
      return { loading: false, success: true }
    case ADD_ITEM_CAROUSEL_FAIL: {
      return { loading: false, error: action.payload }
    }
    default:
      return state
  }
}

export const getItemCarouselReducer = (
  state = { carouselItems: [] },
  action
) => {
  switch (action.type) {
    case GET_ITEM_CAROUSEL_REQUEST:
      return { ...state, loading: true }
    case GET_ITEM_CAROUSEL_SUCCESS:
      return { loading: false, carouselItems: action.payload }
    case GET_ITEM_CAROUSEL_FAIL: {
      return { loading: false, error: action.payload }
    }
    default:
      return state
  }
}

export const getOneItemCarouselReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ONE_ITEM_CAROUSEL_REQUEST:
      return { loading: true }
    case GET_ONE_ITEM_CAROUSEL_SUCCESS:
      return { loading: false, carouselItem: action.payload }
    case GET_ONE_ITEM_CAROUSEL_FAIL: {
      return { loading: false, error: action.payload }
    }
    default:
      return state
  }
}

export const updateItemCarouselReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ITEM_CAROUSEL_REQUEST:
      return { loading: true }
    case UPDATE_ITEM_CAROUSEL_SUCCESS:
      return { loading: false, success: true }
    case UPDATE_ITEM_CAROUSEL_FAIL: {
      return { loading: false, error: action.payload }
    }
    case UPDATE_ITEM_CAROUSEL_RESET:
      return {}
    default:
      return state
  }
}
export const deleteItemCarouselReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ITEM_CAROUSEL_REQUEST:
      return { loading: true }
    case DELETE_ITEM_CAROUSEL_SUCCESS:
      return { loading: false, success: true }
    case DELETE_ITEM_CAROUSEL_FAIL: {
      return { loading: false, error: action.payload }
    }
    default:
      return state
  }
}
