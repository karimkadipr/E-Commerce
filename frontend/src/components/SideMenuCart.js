import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './styles/sideMenuCart.scss'
import { closeSideMenuRight } from '../actions/uiActions'
import { deleteFromCart } from '../actions/cartActions'
import { IconButton } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteIcon from '@material-ui/icons/Delete'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { withRouter } from 'react-router'

const SideMenuCart = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const redirect = userInfo ? '/shipping' : '/login'

  useEffect(() => {
    Aos.init({})
  }, [])

  const handleProceedToCheckout = () => {
    if (cartItems.length !== 0) {
      history.push(redirect)
    }
  }

  const handleSideBar = () => {
    dispatch(closeSideMenuRight())
  }

  const handleClickDelete = (id) => {
    dispatch(deleteFromCart(id))
  }

  return (
    <div
      className='right_side_bar'
      data-aos-once='true'
      data-aos='fade-left'
      data-aos-duration='500'>
      <div className='top_side_bar'>
        <h1>Cart Items</h1>
        <IconButton onClick={handleSideBar} className='show_more_less_button'>
          <CancelIcon />
        </IconButton>
      </div>
      {cartItems !== 0 &&
        cartItems.map((item) => (
          <div
            key={item._id}
            className='cart_side_bar_product'
            data-aos-once='true'
            data-aos='zoom-in'
            data-aos-duration='500'>
            <img src={item.image} alt={item.name} />
            <div>
              <p>{item.name}</p>
              <p style={{ fontSize: '0.75rem' }}>
                $ {item.price} x {item.qty} = ${item.price * item.qty}
              </p>
            </div>
            <IconButton
              onClick={() => handleClickDelete(item._id)}
              className='show_more_less_button'>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      <div className='side_bar_right_price_container'>
        Total Price : $
        {cartItems
          .reduce((acc, item) => acc + Number(item.qty * item.price), 0)
          .toFixed(2)}
      </div>
      <button
        className='show_more_less_button'
        style={{ width: '100%', marginBottom: ' 0.5rem' }}
        onClick={handleSideBar}>
        Continue Shopping
      </button>
      <button
        className='show_more_less_button'
        style={{ width: '100%', marginBottom: ' 0.5rem' }}
        onClick={() => history.push('/cart')}>
        Go to Cart
      </button>
      <button
        className='show_more_less_button'
        style={{ width: '100%', marginBottom: '3rem' }}
        onClick={handleProceedToCheckout}>
        Proceed to checkout
      </button>
    </div>
  )
}

export default withRouter(SideMenuCart)
