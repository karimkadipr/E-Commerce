import React, { useState } from 'react'
import './styles/header.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReactComponent as LogoSvg } from './images/undraw_web_shopping_dd4l.svg'
import DropMenu from './DropMenu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const Header = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

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
  return (
    <nav className='navbar_container'>
      <div className='navbar_leftSide'>
        <div className='myshop_logo'>
          <Link to='/'>
            <LogoSvg style={{ width: 100, height: 60 }} />
          </Link>
        </div>
        <div className='search_bar'>
          <TextField
            onKeyUp={handleKeypress}
            fullWidth={true}
            placeholder='Search for a product'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            variant='outlined'
            inputProps={{
              style: {
                background: 'white',
                overflow: 'hidden',
                borderRadius: 5,
                height: '12px',
              },
            }}
          />
          <button className='button_search' onClick={submitSearch}>
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className='navbar_rightSide'>
        {userInfo ? (
          <div className='text-link'>
            <DropMenu
              name={userInfo.name}
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
              name='Admin'
              items={[
                ['Users Screen', '/admin/users'],
                ['Product Screen', '/admin/products'],
                ['Order Screen', '/admin/orders'],
              ]}
            />
          </div>
        ) : (
          ''
        )}
        <Link className='text-link' to='/cart'>
          <ShoppingCartIcon />
        </Link>
      </div>
    </nav>
  )
}

export default Header
