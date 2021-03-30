import React, { useState } from 'react'
import './styles/header.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as LogoSvg } from './images/shop-seeklogo.com.svg'
import DropMenu from './DropMenu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { OutlinedInput, InputAdornment, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { getProductsByCategory } from '../actions/productActions'

const Header = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      submitSearch()
    }
  }

  const submitSearch = () => {
    if (keyword === '') {
      history.push(`/`)
    } else {
      history.push(`/search/${keyword}`)
    }
  }

  const handleClick = (category) => {
    dispatch(getProductsByCategory(category))
  }
  return (
    <div className='background_navbar'>
      <div className='navbar_container'>
        <div className='navbar_leftSide'>
          <Link to='/'>
            <LogoSvg className='logo' style={{ height: 40, width: 'auto' }} />
          </Link>
        </div>
        <div className='search_bar'>
          <OutlinedInput
            startAdornment={
              <InputAdornment position='start'>
                <IconButton onClick={submitSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            onKeyUp={handleKeypress}
            fullWidth={true}
            placeholder='Search for a product'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            inputProps={{
              style: {
                padding: '0.8rem 1rem',
              },
            }}
            style={{
              borderRadius: 25,
              overflow: 'hidden',
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            }}
          />
        </div>

        <div className='navbar_rightSide'>
          <div className='text-link'>
            <DropMenu
              name='Category'
              items={[
                ['Fashion', '/category/Fashion'],
                ['Shoes', '/category/Shoes'],
                ['Electronics', '/category/Electronics'],
              ]}
              handleClick={handleClick}
            />
          </div>
          {userInfo ? (
            <div className='text-link'>
              <DropMenu
                name={`${userInfo.name}`}
                items={[
                  ['Profile', '/profile'],
                  ['Logout', '/login'],
                ]}
              />
            </div>
          ) : (
            <Link className='text-link' to='/login'>
              login
            </Link>
          )}

          {userInfo && userInfo.isAdmin ? (
            <div className='text-link'>
              <DropMenu
                name='Admin User'
                items={[
                  ['Users Screen', '/admin/users'],
                  ['Product Screen', '/admin/products'],
                  ['Order Screen', '/admin/orders'],
                  ['Carousel Screen', '/admin/carousel'],
                ]}
              />
            </div>
          ) : (
            ''
          )}

          <Link className='text-link' to='/cart'>
            <ShoppingCartIcon />
            {cartItems ? <span>{cartItems.length}</span> : <span>0</span>}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
