import React from 'react'
import { Link } from 'react-router-dom'
import './styles/paginate.css'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <div className='pagination'>
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/products/${x + 1}`
            }>
            <div
              style={page !== x + 1 ? { opacity: '0.3' } : {}}
              className='pagination_items'>
              {x + 1}
            </div>
          </Link>
        ))}
      </div>
    )
  )
}

export default Paginate
