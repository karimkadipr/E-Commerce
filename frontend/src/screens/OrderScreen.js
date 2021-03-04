import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import './styles/orderScreen.css'
import { createOrder } from '../actions/orderActions'
import { CREATE_ORDER_RESET } from '../constants/orderConstants'
import { CART_RESET_PRODUCTS } from '../constants/cartConstants'

const OrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success } = orderCreate

  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress, paymentMethod } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const itemsPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2)

  const shippingPrice = itemsPrice < 100 ? 0 : 20

  const taxPrice = (itemsPrice * 0.1).toFixed(2)

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2)
  const orderItems = cartItems.map((item) => {
    return {
      name: item.name,
      qty: item.qty,
      image: item.image,
      price: item.price,
      product: item._id,
    }
  })

  useEffect(() => {
    if (success) {
      dispatch({ type: CART_RESET_PRODUCTS })
      dispatch({ type: CREATE_ORDER_RESET })
      history.push(`/orderDetails/${order._id}`)
    }
  }, [dispatch, success, history, order])

  const handleCreateOrder = () => {
    dispatch(
      createOrder({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    )
  }

  return (
    <div className='order_container'>
      <div className='order_left_side_container'>
        <h1>Shipping</h1>
        <h3>Personnel information</h3>
        <p>Name : {userInfo.name}</p>
        <p>Email : {userInfo.email}</p>
        <p>
          Address : {shippingAddress.address} - {shippingAddress.city} -
          {shippingAddress.country} - {shippingAddress.postalCode}
        </p>
        <hr />
        <h1>Payment Method</h1>
        <p>Payment method : {paymentMethod}</p>
        <hr />
        <div>
          <h1>Items in cart :</h1>
          {cartItems.map((item) => {
            return (
              <div key={item._id} className='item_order_list'>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>
                  {item.qty} x ${item.price} = ${item.price * item.qty}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      <div className='order_right_side_container'>
        <p>Items Price : ${itemsPrice}</p>
        <p>shipping Price : ${shippingPrice}</p>
        <p>tax Price : ${taxPrice}</p>
        <p>Total Price : ${totalPrice}</p>
        <button className='order_button' onClick={handleCreateOrder}>
          Order
        </button>
      </div>
    </div>
  )
}

export default OrderScreen
