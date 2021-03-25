import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import './styles/gridHomePage.scss'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'

const GridHomePage = ({ products, handleAddToCart, history }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  })
  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
      })
    }
    window.addEventListener('resize', handleResize)
    return (_) => {
      window.removeEventListener('resize', handleResize)
    }
  })
  return (
    <div className='products_container_with_grid'>
      {dimensions.width > 1024 ? (
        <>
          <div className='big_products'>
            <div className='image_big_product'>
              {products.length !== 0 && <img src={products[0].image} />}
            </div>
            <span>{products.length !== 0 && products[0].name}</span>
            <button
              onClick={() => history.push(`/order/${products[0]._id}`)}
              className='btn_add_to_cart_home'>
              <SearchIcon />
            </button>
            <button
              style={{ transitionDelay: '0.25s' }}
              onClick={() => handleAddToCart(products[0]._id)}
              className='btn_add_to_cart_home'>
              <ShoppingCartIcon />
            </button>
          </div>
          <div className='products_grid'>
            {products.slice(1, 5).map((product) => (
              <div className='image_products_grid' key={product._id}>
                <img src={product.image} />
                <span>{product.name.slice(0, 19)}</span>
                <button
                  onClick={() => history.push(`/order/${product._id}`)}
                  className='btn_add_to_cart_home'>
                  <SearchIcon />
                </button>
                <button
                  style={{ transitionDelay: '0.25s' }}
                  onClick={() => handleAddToCart(product._id)}
                  className='btn_add_to_cart_home'>
                  <ShoppingCartIcon />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {products.length !== 0 && (
            <Link to={`/order/${products[0]._id}`} className='big_products'>
              <div className='image_big_product' key={products[0]._id}>
                <img src={products[0].image} />
              </div>
            </Link>
          )}
          <div className='products_grid'>
            {products.slice(1, 5).map((product) => (
              <Link
                to={`/order/${product._id}`}
                className='image_products_grid'
                key={product._id}>
                <img src={product.image} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default withRouter(GridHomePage)
