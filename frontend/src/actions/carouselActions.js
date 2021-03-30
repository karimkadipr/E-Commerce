import axios from 'axios'
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
  DELETE_ITEM_CAROUSEL_REQUEST,
  DELETE_ITEM_CAROUSEL_SUCCESS,
  DELETE_ITEM_CAROUSEL_FAIL,
  GET_ONE_ITEM_CAROUSEL_REQUEST,
  GET_ONE_ITEM_CAROUSEL_SUCCESS,
  GET_ONE_ITEM_CAROUSEL_FAIL,
} from '../constants/carouselConstants'

const addItemCarousel = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_ITEM_CAROUSEL_REQUEST,
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

    await axios.post('/api/carousel', {}, config)

    dispatch({
      type: ADD_ITEM_CAROUSEL_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ADD_ITEM_CAROUSEL_FAIL,
      payload: error,
    })
  }
}

const getItemCarousel = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ITEM_CAROUSEL_REQUEST,
    })

    const { data } = await axios.get('/api/carousel')

    dispatch({
      type: GET_ITEM_CAROUSEL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_ITEM_CAROUSEL_FAIL,
      payload: error,
    })
  }
}

const getOneItemCarousel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ONE_ITEM_CAROUSEL_REQUEST,
    })

    const { data } = await axios.get(`/api/carousel/${id}`)

    dispatch({
      type: GET_ONE_ITEM_CAROUSEL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_ONE_ITEM_CAROUSEL_FAIL,
      payload: error,
    })
  }
}

const updateItemCarousel = (id, { title, image, category }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: UPDATE_ITEM_CAROUSEL_REQUEST,
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

    await axios.put(`/api/carousel/${id}`, { title, image, category }, config)

    dispatch({
      type: UPDATE_ITEM_CAROUSEL_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_ITEM_CAROUSEL_FAIL,
      payload: error,
    })
  }
}

const deleteItemCarousel = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_ITEM_CAROUSEL_REQUEST,
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

    await axios.delete(`/api/carousel/${id}`, config)

    dispatch({
      type: DELETE_ITEM_CAROUSEL_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_ITEM_CAROUSEL_FAIL,
      payload: error,
    })
  }
}

export {
  addItemCarousel,
  getItemCarousel,
  updateItemCarousel,
  deleteItemCarousel,
  getOneItemCarousel,
}
