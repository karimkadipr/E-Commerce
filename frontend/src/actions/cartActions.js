import axios from 'axios'
import {
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_PRODUCT,
    payload: data,
    qty,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const deleteFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_PRODUCT,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const saveShippingAddress = (address) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: address,
  })

  localStorage.setItem('userAddress', JSON.stringify(address))
}

const savePaymentMethod = (paymentMethod) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  })
  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}
export { addToCart, deleteFromCart, saveShippingAddress, savePaymentMethod }
