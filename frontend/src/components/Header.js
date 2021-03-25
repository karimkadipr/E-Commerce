import React, { useState } from 'react'
import './styles/header.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReactComponent as LogoSvg } from './images/philadelphia-eagles-2.svg'
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
    <div className='background_navbar'>
      <nav className='navbar_container'>
        <div className='navbar_leftSide'>
          <Link to='/'>
            <LogoSvg className='logo' />
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
                height: 3,
              },
            }}
          />

          <button className='button_search' onClick={submitSearch}>
            <SearchIcon />
          </button>
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
    </div>
  )
}

export default Header
