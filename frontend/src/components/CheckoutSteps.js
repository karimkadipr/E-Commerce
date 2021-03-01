import React from 'react'

const CheckoutSteps = ({ signin, shipping, payment, placeorder }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        fontSize: 25,
        fontWeight: '700',
      }}>
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
