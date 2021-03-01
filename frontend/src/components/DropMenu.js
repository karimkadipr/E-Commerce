import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles/DropMenu.css'
import { userLogout } from '../actions/userActions'
import { useDispatch } from 'react-redux'

function DropMenu({ name, items }) {
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

    return function cleanup() {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    dispatch(userLogout())
    setOpen((open) => !open)
  }

  function DropItem(props) {
    return (
      <a href='#' className='menu-item'>
        <span className='icon-button'>{props.iconLeft}</span>
        {props.children}
        <span>{props.iconRight}</span>
      </a>
    )
  }

  return (
    <div ref={DropRef}>
      <a
        className='div_ref'
        href='#'
        onClick={() => {
          setOpen((open) => !open)
        }}

        /*  onMouseLeave={()=> setTimeout(()=> setOpen(false), 300)} */
      >
        {name}
      </a>
      {open && (
        <div className='DropMenu'>
          <div>
            {items.map((item) => {
              if (item[0] === 'Logout') {
                return (
                  <Link to={item[1]} onClick={handleLogout}>
                    <DropItem>{item[0]} </DropItem>
                  </Link>
                )
              } else {
                return (
                  <Link
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

export default DropMenu
