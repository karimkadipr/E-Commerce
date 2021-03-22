import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
  PRODUCT_DETAIL_RESET,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
  TOP_PRODUCT_REQUEST,
  TOP_PRODUCT_SUCCESS,
  TOP_PRODUCT_FAIL,
  GET_PRODUCTS_CATEGORY_REQUEST,
  GET_PRODUCTS_CATEGORY_SUCCESS,
  GET_PRODUCTS_CATEGORY_FAIL,
} from '../constants/productConstants.js'

export const getProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getProductDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_DETAIL_RESET:
      return { ...state, success: false }
    default:
      return state
  }
}

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true }
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true }
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, sampleProduct: action.payload }
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_PRODUCT_RESET:
      return {}
    default:
      return state
  }
}

export const updateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true }
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, productUpdated: action.payload }
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_PRODUCT_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const addReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW_REQUEST:
      return { loading: true }
    case ADD_REVIEW_SUCCESS:
      return { loading: false, success: true, review: action.payload }
    case ADD_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getTopProductsReducer = (state = { topProducts: [] }, action) => {
  switch (action.type) {
    case TOP_PRODUCT_REQUEST:
      return { loading: true, topProducts: [] }
    case TOP_PRODUCT_SUCCESS:
      return { loading: false, success: true, topProducts: action.payload }
    case TOP_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getProductsByCategoryReducer = (
  state = { productsByCategory: [] },
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS_CATEGORY_REQUEST:
      return { ...state, loading: true }
    case GET_PRODUCTS_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
        productsByCategory: action.payload,
      }
    case GET_PRODUCTS_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
