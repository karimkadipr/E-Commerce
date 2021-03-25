import React from 'react'
import { withRouter } from 'react-router'

import './styles/gridHomePage.scss'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'

const GridHomePage = ({ products, handleAddToCart, history }) => {
  return (
    <div className='products_container_with_grid'>
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
    </div>
  )
}

export default withRouter(GridHomePage)
