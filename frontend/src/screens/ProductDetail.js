import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addReview, getProductDetails } from '../actions/productActions'
import RatingComponent from '../components/RatingComponent'
import { addToCart } from '../actions/cartActions'
import {
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Input,
} from '@material-ui/core'
import './styles/productDetail.css'
import Meta from '../components/Meta'

const ProductDetail = ({ match, history }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [title, setTitle] = useState('')
  const [qty, setQty] = useState(0)
  const productId = match.params.id

  const dispatch = useDispatch()

  const getProductDetail = useSelector((state) => state.getProductDetail)
  const { product } = getProductDetail

  const addReviewValues = useSelector((state) => state.addReview)
  const { success: successAddReview } = addReviewValues

  useEffect(() => {
    dispatch(getProductDetails(productId))
  }, [productId, dispatch, successAddReview])

  const { countInStock } = product

  const submitHandler = () => {
    if (countInStock !== 0) {
      dispatch(addToCart(match.params.id, qty))
      history.push(`/cart`)
    }
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    dispatch(addReview({ rating, comment, title }, match.params.id))
  }

  let arr = []
  for (let i = 1; i <= product.countInStock; i++) {
    arr.push(i)
  }
  return (
    <div className='product_Item_Container'>
      <div className='product_Image'>
        <Link className='go_back_button' to='/'>
          Go Back
        </Link>
        <div className='img_container_product'>
          <img src={product.image} alt={product.name} />
        </div>

        <h1>Reviews : </h1>

        {product.numReviews === 0 ? (
          <p>No reviews</p>
        ) : (
          <div className='review_container'>
            {product.reviews.map((review) => {
              return (
                <div key={review._id}>
                  <Meta title={product.name} />
                  <p>{review.name}</p>
                  <div style={{ display: 'flex' }}>
                    <RatingComponent rating={Number(review.rating)} />
                    <strong> - {review.title}</strong>
                  </div>
                  <p style={{ fontSize: '13px', paddingBottom: '5px' }}>
                    Reviewed on : {review.createdAt.substring(0, 10)}
                  </p>
                  <p className='comment_container'>
                    Comment : {review.comment}
                  </p>
                  <hr />
                </div>
              )
            })}
          </div>
        )}
        <div className='rate_product_container'>
          <h1>Add a product Review : </h1>
          <form onSubmit={handleSubmitReview}>
            <div className='review_input'>
              <FormControl fullWidth={true} className='select_quantity'>
                <InputLabel id='demo-simple-select-label'>
                  Rate the product
                </InputLabel>
                <Select onChange={(e) => setRating(e.target.value)}>
                  <MenuItem value='1'>1 - Very Bad Product</MenuItem>
                  <MenuItem value='2'>2 - Bad Product</MenuItem>
                  <MenuItem value='3'>3 - Average Product</MenuItem>
                  <MenuItem value='4'>4 - Good Product</MenuItem>
                  <MenuItem value='5'>5 - Very good product</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='review_input'>
              <FormControl fullWidth={true}>
                <InputLabel htmlFor='my-input'>Review title</InputLabel>
                <Input
                  type='text'
                  value={title}
                  fullWidth={true}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </div>
            <div className='review_input'>
              <FormControl fullWidth={true}>
                <InputLabel htmlFor='my-input'>Enter Your Comment </InputLabel>
                <Input
                  type='text'
                  value={comment}
                  fullWidth={true}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FormControl>
            </div>

            <button className='add_to_cart_button' type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className='name_price_container'>
        <p>
          <strong>{product.name}</strong>
        </p>
        <p style={{ display: 'flex' }}>
          <RatingComponent rating={product.rating} />
          <span>
            {' '}
            - {product.numReviews}{' '}
            {product.numReviews === 1 ? 'Review' : 'Reviews'}
          </span>
        </p>

        <p>Price : ${product.price}</p>
        <span style={{ paddingTop: 10 }}>Description :</span>
        <p>{product.description}</p>
      </div>
      <div className='add_to_cart_container'>
        <div className='add_to_cart_container_item'>
          <p>Price : $ {product.price}</p>
        </div>
        <div className='add_to_cart_container_item'>
          <p>
            status :{' '}
            {product.countInStock === 0 ? (
              <strong>Not Available</strong>
            ) : (
              <strong>In Stock</strong>
            )}
          </p>
        </div>
        {product.countInStock !== 0 ? (
          <div style={{ paddingTop: 10 }}>
            <FormControl className='select_quantity'>
              <InputLabel id='demo-simple-select-label'>Quantity</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={qty === 0 ? '' : qty}
                onChange={(e) => setQty(e.target.value)}>
                {arr.map((item) => (
                  <MenuItem key={item._id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ) : (
          ''
        )}

        <button className='add_to_cart_button' onClick={submitHandler}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductDetail
