import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useDispatch, useSelector } from 'react-redux'
import './styles/productCardList.scss'
import { addToCart } from '../actions/cartActions'
import { openSideMenuRight } from '../actions/uiActions'
import RatingComponent from '../components/RatingComponent'

import { MenuItem, InputLabel, FormControl, Select } from '@material-ui/core'

const ProductCardList = ({ product }) => {
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)

  useEffect(() => {
    Aos.init({})
  }, [])

  const submitHandler = (id) => {
    if (product.countInStock !== 0) {
      dispatch(addToCart(id, qty))
      dispatch(openSideMenuRight())
    }
  }

  let arr = []
  for (let i = 1; i <= product.countInStock; i++) {
    arr.push(i)
  }

  return (
    <div
      className='product_card_list_container'
      data-aos-once='true'
      data-aos='zoom-in'
      data-aos-duration='500'>
      <Link to={`/order/${product._id}`} className='image_product_card_list'>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className='content_product_card_list'>
        <p style={{ fontSize: '1.5rem' }}>{product.name}</p>
        <div
          className='rating_component_reviews'
          style={{
            display: 'flex',
            fontSize: '0.75rem',
            alignItems: 'center',
          }}>
          <span style={{ marginRight: '0.25rem' }}>
            <RatingComponent rating={product.rating} />
          </span>
          <p>
            {`${product.numReviews} ${
              product.numReviews === 1 ? 'Review' : 'Reviews'
            }`}
          </p>
        </div>
        <p style={{ marginBottom: '2rem' }}>Price : ${product.price}</p>
        <p style={{ fontSize: '0.85rem' }}>
          Brand: <span style={{ marginLeft: '0.1rem' }}>{product.brand}</span>
        </p>
        <p style={{ fontSize: '0.85rem' }}>
          Availability:
          <span style={{ marginLeft: '0.1rem' }}>
            {product.countInStock !== 0 ? 'In Stock' : 'Not Available'}
          </span>
        </p>

        <p
          style={{
            margin: '2rem 0',
            paddingTop: '1rem',
            color: '#898989',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            fontWeight: '300',
          }}>
          {product.description}
        </p>
        <div className='add_to_cart_container'>
          {product.countInStock !== 0 && (
            <>
              <div style={{ paddingRight: '2rem' }}>
                <FormControl className='select_quantity'>
                  <InputLabel id='demo-simple-select-label'>
                    Quantity
                  </InputLabel>
                  <Select
                    defaultValue={qty}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    onChange={(e) => setQty(e.target.value)}>
                    {arr.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <button
                className='show_more_less_button'
                onClick={() => submitHandler(product._id, qty)}>
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCardList
