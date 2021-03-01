import {
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      const item = action.payload
      item.qty = action.qty

      const itemExist = state.cartItems.find((x) => x._id === item._id)

      if (!itemExist) {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === itemExist._id
              ? { ...itemExist, qty: action.qty }
              : item
          ),
        }
      }
    case CART_REMOVE_PRODUCT:
      const productId = action.payload

      const itemToRemoveExist = state.cartItems.find((x) => x._id === productId)
      if (itemToRemoveExist) {
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item._id !== productId),
        }
      }
    // fallsthrough
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload }

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload }

    default:
      return state
  }
}
