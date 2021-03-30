import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import './styles/DropMenu.scss'
import { userLogout } from '../actions/userActions'
import { useDispatch } from 'react-redux'
import Collapse from '@material-ui/core/Collapse'
import { Fade } from '@material-ui/core'

function DropMenu({ name, items, history, handleClick }) {
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
          setOpen(true)
        }}>
        {name}
      </p>
      <Fade in={open} timeout={500}>
        <div>
          <Collapse
            in={open}
            timeout={{ appear: 0, enter: 500, exit: 0 }}
            className='DropMenu'>
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
                        if (name === 'Category') {
                          handleClick(item[0])
                        }
                        setOpen(false)
                      }}>
                      <DropItem>{item[0]}</DropItem>
                    </Link>
                  )
                }
              })}
            </div>
          </Collapse>
        </div>
      </Fade>
    </div>
  )
}

export default withRouter(DropMenu)
