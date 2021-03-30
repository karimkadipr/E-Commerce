import React from 'react'
import { Link } from 'react-router-dom'
import './styles/productCard.scss'
import { PRODUCT_DETAIL_RESET } from '../constants/productConstants'
import { useDispatch } from 'react-redux'

const ProductCard = ({ product, cardType }) => {
  const dispatch = useDispatch()

  const handleResetProduct = () => {
    dispatch({ type: PRODUCT_DETAIL_RESET })
  }
  return (
    <>
      {cardType === 'standard' && (
        <div onClick={handleResetProduct} className='featured_product'>
          <Link to={`/order/${product._id}`} className='image_holder_home_page'>
            <img src={product.image} alt={product.name} />
          </Link>
          <p className='p_product_card'>{product.brand}</p>
          <p style={{ letterSpacing: '0.15em' }}>{product.name}</p>
          <p className='p_product_card'>{product.category}</p>
          <p className='p_product_card_price'>${product.price} </p>
        </div>
      )}

      {cardType === 'category' && (
        <div onClick={handleResetProduct} className='featured_product_category'>
          <Link to={`/order/${product._id}`} className='image_holder_home_page'>
            <img src={product.image} alt={product.name} />
          </Link>
          <p className='p_product_card'>{product.brand} </p>
          <Link to={`/order/${product._id}`} style={{ color: 'black' }}>
            <p>{product.name}</p>
          </Link>
          <p className='p_product_card'>{product.category}</p>
          <p className='p_product_card_price'>${product.price} </p>
        </div>
      )}
    </>
  )
}

export default ProductCard
