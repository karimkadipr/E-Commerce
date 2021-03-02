import React, { useState, useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import './styles/shippingScreen.css'
import { Input } from '@material-ui/core'
import { CREATE_ORDER_RESET } from '../constants/orderConstants'

const ShippingScreen = ({ history }) => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const length = cartItems.length

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: CREATE_ORDER_RESET,
    })
    if (length === 0) {
      history.push('/cart')
    }
  }, [dispatch, length, history])
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        address,
        city,
        country,
        postalCode,
      })
    )
    history.push('/payment')
  }
  return (
    <div className='shipping_container'>
      <div>
        <CheckoutSteps shipping signin />
        <form className='form_shipping_address' onSubmit={handleSubmit}>
          <h3>Shipping information</h3>
          <div className='input_shipping_container'>
            <Input
              type='text'
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Enter your address'
              fullWidth={true}
              required={true}
            />
          </div>
          <div className='input_shipping_container'>
            <Input
              type='text'
              onChange={(e) => setCity(e.target.value)}
              placeholder='Enter your city'
              fullWidth={true}
              required={true}
            />
          </div>
          <div className='input_shipping_container'>
            <Input
              type='text'
              onChange={(e) => setCountry(e.target.value)}
              placeholder='Enter your country'
              fullWidth={true}
              required={true}
            />
          </div>
          <div className='input_shipping_container'>
            <Input
              type='text'
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder='ZIP Code'
              fullWidth={true}
              required={true}
            />
          </div>
          <button className='shipping_button' type='submit'>
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default ShippingScreen
