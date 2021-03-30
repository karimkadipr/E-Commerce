import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { closeSideMenuRight } from '../actions/uiActions'
import { MenuItem, InputLabel, FormControl, Select } from '@material-ui/core'
import { addToCart, deleteFromCart } from '../actions/cartActions'
import { ReactComponent as EmptyCartSvg } from './images/undraw_empty_cart_co35.svg'
import './styles/cartPage.scss'
import { TransitionGroup } from 'react-transition-group'
import { CSSTransition } from 'react-transition-group'

const CartPage = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(closeSideMenuRight())
  }, [])
  const globalQty = cartItems.reduce((acc, item) => acc + Number(item.qty), 0)

  const GlobalPrice = cartItems
    .reduce((acc, item) => acc + Number(item.qty * item.price), 0)
    .toFixed(2)

  const redirect = userInfo ? '/shipping' : '/login'

  const handleClickDelete = (id) => {
    dispatch(deleteFromCart(id))
  }

  const handleProceedToCheckout = () => {
    if (cartItems.length !== 0) {
      history.push(redirect)
    }
  }

  return (
    <div className='cart_global_container'>
      <h1>Your Cart</h1>
      <div className='cart_container'>
        {cartItems.length !== 0 ? (
          <div>
            <TransitionGroup className='products_container'>
              {cartItems.map((item) => (
                <CSSTransition
                  key={item._id}
                  classNames='item-cart-page'
                  timeout={500}>
                  <div className='product_container'>
                    <img src={item.image} alt={item.name} />
                    <div className='product_name'>{item.name}</div>
                    <div className='price_plus_quantity'>
                      <p className='product_price'>
                        <strong>$ {item.price}</strong>
                      </p>
                      <FormControl className='select_quantity'>
                        <InputLabel id='demo-simple-select-label'>
                          Quantity
                        </InputLabel>
                        <Select
                          defaultValue=''
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(addToCart(item._id, e.target.value))
                          }>
                          {Array.from(
                            { length: item.countInStock },
                            (_, index) => index + 1
                          ).map((x) => {
                            return (
                              <MenuItem key={x + 1} value={x}>
                                {x}
                              </MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <button
                      className='show_more_less_button'
                      onClick={() => handleClickDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        ) : (
          <div className='empty_cart_container'>
            <div>
              Your Cart is empty ! <Link to='/'>Home Page</Link>
            </div>
            <EmptyCartSvg className='cart_svg' />
          </div>
        )}

        <div className='right_side_cart'>
          <p>Total Quantity : {globalQty} </p>
          <p> Total Price : ${GlobalPrice}</p>
          <button
            className='show_more_less_button'
            onClick={handleProceedToCheckout}>
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
