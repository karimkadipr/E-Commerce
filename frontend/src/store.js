import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  getProductsReducer,
  getProductDetailReducer,
  deleteProductReducer,
  createProductReducer,
  updateProductReducer,
  addReviewReducer,
  getTopProductsReducer,
  getProductsByCategoryReducer,
  getLastProductsReducer,
} from './reducers/productReducers.js'

import { cartReducer } from './reducers/cartReducers.js'

import {
  userLoginReducer,
  registerUserReducer,
  updateUserReducer,
  getAllUsersReducer,
  deleteUserReducer,
  adminUpdateUserReducer,
  adminGetUserReducer,
} from './reducers/userReducers.js'

import {
  orderCreateReducer,
  getOrderReducer,
  payOrderReducer,
  getMyOrdersReducer,
  getAllOrdersReducer,
  markAsDeliveredReducer,
  deleteOrderByIdReducer,
} from './reducers/orderReducers.js'

import {
  addItemCarouselReducer,
  getItemCarouselReducer,
  updateItemCarouselReducer,
  deleteItemCarouselReducer,
  getOneItemCarouselReducer,
} from './reducers/carouselReducers'

import { toggleSideBarReducer } from './reducers/uiReducer'

const reducer = combineReducers({
  getProducts: getProductsReducer,
  getProductDetail: getProductDetailReducer,
  deleteProduct: deleteProductReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  getTopProducts: getTopProductsReducer,
  addReview: addReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  registerUser: registerUserReducer,
  updateUser: updateUserReducer,
  orderCreate: orderCreateReducer,
  getOrder: getOrderReducer,
  payOrder: payOrderReducer,
  getMyOrders: getMyOrdersReducer,
  getAllOrders: getAllOrdersReducer,
  deleteOrderById: deleteOrderByIdReducer,
  markAsDelivered: markAsDeliveredReducer,
  getAllUsers: getAllUsersReducer,
  deleteUser: deleteUserReducer,
  adminUpdateUser: adminUpdateUserReducer,
  adminGetUser: adminGetUserReducer,
  getProductsByCategory: getProductsByCategoryReducer,
  getLastProducts: getLastProductsReducer,
  addItemCarousel: addItemCarouselReducer,
  getItemCarousel: getItemCarouselReducer,
  updateItemCarousel: updateItemCarouselReducer,
  deleteItemCarousel: deleteItemCarouselReducer,
  getOneItemCarousel: getOneItemCarouselReducer,
  toggleSideBar: toggleSideBarReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userLoginFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const userAddressFromStorage = localStorage.getItem('userAddress')
  ? JSON.parse(localStorage.getItem('userAddress'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: userAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: {
    userInfo: userLoginFromStorage,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
