import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import './styles/DropMenu.scss'
import { userLogout } from '../actions/userActions'
import { useDispatch } from 'react-redux'

function DropMenu({ name, items, history }) {
  const [open, setOpen] = useState(false)
  const DropRef = useRef()

  const dispatch = useDispatch()

  function handleClickOutside(event) {
    if (DropRef.current && !DropRef.current.contains(event.target)) {
      setOpen(() => false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('mouseover', handleClickOutside)
    return function cleanup() {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('mouseover', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    dispatch(userLogout())
    setOpen((open) => !open)
    history.push('/login')
  }

  function DropItem(props) {
    return (
      <p className='menu-item'>
        <span className='icon-button'>{props.iconLeft}</span>
        {props.children}
        <span>{props.iconRight}</span>
      </p>
    )
  }

  return (
    <div
      ref={DropRef}
      onMouseLeave={() => setOpen(false)}
      onMouseOver={() => setOpen(true)}>
      <p
        className='div_ref'
        onClick={() => {
          setOpen((open) => !open)
        }}>
        {name}
      </p>
      {open && (
        <div className='DropMenu'>
          <div>
            {items.map((item) => {
              if (item[0] === 'Logout') {
                return (
                  <Link key={item[0]} to={item[1]} onClick={handleLogout}>
                    <DropItem>{item[0]} </DropItem>
                  </Link>
                )
              } else {
                return (
                  <Link
                    key={item[0]}
                    to={item[1]}
                    onClick={() => {
                      setOpen((open) => !open)
                    }}>
                    <DropItem>{item[0]}</DropItem>
                  </Link>
                )
              }
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default withRouter(DropMenu)
