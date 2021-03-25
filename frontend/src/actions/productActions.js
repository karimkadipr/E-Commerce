import axios from 'axios'
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
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_FAIL,
  ADD_REVIEW_SUCCESS,
  TOP_PRODUCT_REQUEST,
  TOP_PRODUCT_SUCCESS,
  TOP_PRODUCT_FAIL,
  GET_PRODUCTS_CATEGORY_REQUEST,
  GET_PRODUCTS_CATEGORY_SUCCESS,
  GET_PRODUCTS_CATEGORY_FAIL,
  GET_PRODUCTS_LAST_REQUEST,
  GET_PRODUCTS_LAST_SUCCESS,
  GET_PRODUCTS_LAST_FAIL,
} from '../constants/productConstants.js'

const getListProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    )
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
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

    await axios.delete(`/api/products/${id}`, config)

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error,
    })
  }
}

const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
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

    const { data } = await axios.post(`/api/products/addProduct`, {}, config)

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error,
    })
  }
}

const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
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
      `/api/products/updateProduct/${id}`,
      product,
      config
    )

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error,
    })
  }
}

const addReview = (review, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_REVIEW_REQUEST,
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

    const { data } = await axios.post(
      `/api/products/reviews/${id}`,
      review,
      config
    )

    dispatch({
      type: ADD_REVIEW_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADD_REVIEW_FAIL,
      payload: error,
    })
  }
}

const getTopProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTS_CATEGORY_REQUEST,
    })

    const { data } = await axios.get('/api/products/top')

    dispatch({
      type: GET_PRODUCTS_CATEGORY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_CATEGORY_FAIL,
    })
  }
}

const getProductsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTS_CATEGORY_REQUEST,
    })

    const { data } = await axios.get(`/api/products/category/${category}`)

    dispatch({
      type: GET_PRODUCTS_CATEGORY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_CATEGORY_FAIL,
    })
  }
}

const getLastProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTS_LAST_REQUEST,
    })

    const { data } = await axios.get(`/api/products/lastadded`)

    dispatch({
      type: GET_PRODUCTS_LAST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_LAST_FAIL,
    })
  }
}

export {
  getLastProducts,
  getListProducts,
  getProductDetails,
  deleteProduct,
  createProduct,
  updateProduct,
  addReview,
  getTopProducts,
  getProductsByCategory,
}
