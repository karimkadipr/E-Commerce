import React, { useState, useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import {
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
} from '@material-ui/core'
import './styles/paymentScreen.css'

const PaymentScreen = ({ history }) => {
  const [payment, setPayment] = useState('')

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const length = cartItems.length

  useEffect(() => {
    if (length === 0) {
      history.push('/cart')
    }
  }, [dispatch, length, history])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(payment))
    history.push('/order')
  }

  return (
    <div className='payment_container'>
      <CheckoutSteps signin shipping payment />
      <div className='method_container'>
        <FormControl className='form_method_container' component='fieldset'>
          <FormLabel component='legend'>Payment Method</FormLabel>
          <RadioGroup
            aria-label='paymentMethod'
            value={payment}
            onChange={(event) => setPayment(event.target.value)}>
            <FormControlLabel
              value='PayPal'
              control={<Radio />}
              label='PayPal'
              required={true}
            />
          </RadioGroup>
          <button
            onClick={handleSubmit}
            className='payment_button'
            type='submit'>
            Submit
          </button>
        </FormControl>
      </div>
    </div>
  )
}

export default PaymentScreen
