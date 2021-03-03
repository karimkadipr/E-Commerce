import React from 'react'
import './styles/checkoutSteps.css'

const CheckoutSteps = ({ signin, shipping, payment, placeorder }) => {
  return (
    <div className='checkoutSteps_container'>
      {signin ? (
        <div>SignIn</div>
      ) : (
        <div style={{ color: 'grey' }}>Sign In</div>
      )}
      {shipping ? (
        <div>shipping</div>
      ) : (
        <div style={{ color: 'grey' }}>shipping</div>
      )}
      {payment ? (
        <div>payment</div>
      ) : (
        <div style={{ color: 'grey' }}>payment</div>
      )}
      {placeorder ? (
        <div>placeorder</div>
      ) : (
        <div style={{ color: 'grey' }}>placeorder</div>
      )}
    </div>
  )
}

export default CheckoutSteps
