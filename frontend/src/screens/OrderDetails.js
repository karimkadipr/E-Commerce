import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useSelector, useDispatch } from 'react-redux'
import './styles/orderScreen.css'
import { getOrderById, payOrder } from '../actions/orderActions'
import DeliveredPaid from '../components/DeliveredPaid'
import { PAY_ORDER_RESET } from '../constants/orderConstants'

const OrderDetails = ({ match, history }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const [sdkReady, setSdkReady] = useState(false)

  const getOrder = useSelector((state) => state.getOrder)
  const { order, success: getOrderSuccess } = getOrder

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const payOrderValue = useSelector((state) => state.payOrder)
  const { success: successPay } = payOrderValue

  useEffect(() => {
    dispatch(getOrderById(orderId))
  }, [])

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay) {
      dispatch({ type: PAY_ORDER_RESET })
      dispatch(getOrderById(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [orderId, dispatch, successPay, getOrderSuccess, order])

  const handleClickGoBack = () => {
    history.push('/')
  }

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  return (
    <div>
      {!order ? (
        <p>Loading</p>
      ) : (
        <div className='order_container'>
          <div className='order_left_side_container'>
            <h1>ORDER ID : {order._id}</h1>
            <h2>Shipping</h2>
            <p>Name : {userInfo.name}</p>
            <p>Email : {userInfo.email}</p>
            <p>
              Address : {order.shippingAddress.address} -
              {order.shippingAddress.city} -{order.shippingAddress.country} -
              {order.shippingAddress.postalCode}
            </p>
            {order.isDelivered ? (
              <DeliveredPaid color='green'>Delivered</DeliveredPaid>
            ) : (
              <DeliveredPaid color='red'>Not Delivered</DeliveredPaid>
            )}
            <hr />
            <div>
              <h1>Payment Method</h1>
              <p style={{ paddingBottom: '1rem' }}>
                Payment method : {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <DeliveredPaid color='green'>
                  {' '}
                  <p>Paid At : {order.paidAt.substring(0, 10)}</p>
                </DeliveredPaid>
              ) : (
                <DeliveredPaid color='red'>Not Paid</DeliveredPaid>
              )}
            </div>
            <hr />
            <div>
              {order.orderItems.map((item) => {
                return (
                  <div key={item.name} className='item_order_list'>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>
                      {item.qty} x $ {item.price} = ${' '}
                      {(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='order_right_side_container'>
            <h1>Order Summary</h1>
            <p>
              Items : $
              {order.orderItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </p>
            <p>Shipping : ${order.shippingPrice}</p>
            <p>Tax Price : ${order.taxPrice}</p>
            <p>Total : ${order.totalPrice}</p>
            {order.isPaid ? (
              <div style={{ textAlign: 'center' }}>
                <button
                  style={{ width: '100%', marginTop: '1rem' }}
                  className='order_button'
                  onClick={handleClickGoBack}>
                  Go Home
                </button>
              </div>
            ) : !sdkReady ? (
              <div>Loading PayPal Payment ...</div>
            ) : (
              <PayPalButton
                amount={order.totalPrice}
                onSuccess={successPaymentHandler}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetails
