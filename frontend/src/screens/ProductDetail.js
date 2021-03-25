import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Meta from '../components/Meta'
import Aos from 'aos'
import 'aos/dist/aos.css'
import {
  addReview,
  getProductDetails,
  getProductsByCategory,
} from '../actions/productActions'
import RatingComponent from '../components/RatingComponent'
import { addToCart } from '../actions/cartActions'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core'
import 'swiper/swiper-bundle.css'
import './styles/carousel.scss'
import 'swiper/swiper.scss'
import ProductCard from '../components/ProductCard'
import {
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Input,
} from '@material-ui/core'
import './styles/productDetail.scss'

const ProductDetail = ({ match, history }) => {
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [title, setTitle] = useState('')
  const [qty, setQty] = useState(1)
  const [showAddReview, setShowAddReview] = useState(true)
  const [menu, setMenu] = useState('reviews')
  const productId = match.params.id

  SwiperCore.use([Navigation, Pagination, Scrollbar])

  const dispatch = useDispatch()

  const getProductDetail = useSelector((state) => state.getProductDetail)
  const { product, success: productDetailsSuccess } = getProductDetail
  const { countInStock } = product

  const getProductsByCategoryValues = useSelector(
    (state) => state.getProductsByCategory
  )
  const { productsByCategory } = getProductsByCategoryValues

  const addReviewValues = useSelector((state) => state.addReview)
  const { success: successAddReview } = addReviewValues

  useEffect(() => {
    Aos.init({})
  }, [])

  useEffect(() => {
    if (!product.name) {
      dispatch(getProductDetails(productId))
    }
    if (product.name) {
      dispatch(getProductsByCategory(product.category))
    }
  }, [productId, dispatch, successAddReview, product, productDetailsSuccess])

  const submitHandler = () => {
    if (countInStock !== 0) {
      dispatch(addToCart(match.params.id, qty))
      history.push(`/cart`)
    }
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    dispatch(addReview({ rating, comment, title }, match.params.id))
    setRating('')
    setComment('')
    setTitle('')
  }

  let arr = []
  for (let i = 1; i <= product.countInStock; i++) {
    arr.push(i)
  }
  return (
    <div className='product_details_container'>
      <div className='product_Item_Container'>
        {/*       <Link className='go_back_button' to='/'>
            Go Back
          </Link> */}
        <div className='swiper_container_product_details'>
          <Swiper pagination={{ clickable: true }}>
            <SwiperSlide>
              <img src={product.image} alt={product.name} />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className='name_price_container'>
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
            Brand: <span>{product.brand}</span>
          </p>
          <p style={{ fontSize: '0.85rem' }}>
            Availability:
            <span>
              {product.countInStock !== 0 ? 'In Stock' : 'Not Available'}
            </span>
          </p>

          <p
            style={{
              margin: '2rem 0',
              paddingTop: '2.5rem',
              borderTop: '1px solid #cacaca',
              color: '#898989',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              fontWeight: '300',
            }}>
            {product.description}
          </p>
          <div className='add_to_cart_container'>
            {product.countInStock !== 0 ? (
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
            ) : (
              ''
            )}
            <button className='show_more_less_button' onClick={submitHandler}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className='reviews_product_container'>
        <div style={{ minHeight: 200, borderBottom: '1px solid #cacaca' }}>
          <div className='switch_menu_review_description'>
            <h3 onClick={() => setMenu('reviews')}>Reviews</h3>
            <h3 onClick={() => setMenu('description')}>Description</h3>
            <h3 onClick={() => setMenu('details')}>Details</h3>
          </div>
          {menu === 'reviews' && (
            <div
              data-aos-once='true'
              data-aos='fade-in'
              data-aos-duration='500'>
              <div>
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
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              fontSize: '0.75rem',
                              height: '1rem',
                            }}>
                            <span>
                              <RatingComponent rating={Number(review.rating)} />
                            </span>
                            <span> - {review.title}</span>
                          </div>
                          <p
                            style={{
                              fontSize: '0.6rem',
                              color: '#898989',
                              paddingBottom: '0.5rem',
                            }}>
                            Reviewed on : {review.createdAt.substring(0, 10)}
                          </p>
                          <p style={{ paddingBottom: '0.5rem' }}>
                            {review.comment}
                          </p>
                          <hr />
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              {showAddReview && (
                <>
                  <div className='rate_product_container'>
                    <h1>Add a product Review : </h1>
                    <form onSubmit={handleSubmitReview}>
                      <div className='review_input'>
                        <FormControl
                          fullWidth={true}
                          className='select_quantity'>
                          <InputLabel id='demo-simple-select-label'>
                            Rate the product
                          </InputLabel>
                          <Select
                            defaultValue=''
                            onChange={(e) => setRating(e.target.value)}>
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
                          <InputLabel htmlFor='my-input'>
                            Review title
                          </InputLabel>
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
                          <InputLabel htmlFor='my-input'>
                            Enter Your Comment{' '}
                          </InputLabel>
                          <Input
                            type='text'
                            value={comment}
                            fullWidth={true}
                            multiline
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <button
                        style={{ margin: '1rem 0' }}
                        className='show_more_less_button'
                        type='submit'>
                        Submit
                      </button>
                    </form>
                  </div>
                </>
              )}
              <button
                style={{ marginBottom: '0.5rem' }}
                className='show_more_less_button'
                onClick={() => setShowAddReview(!showAddReview)}>
                {!showAddReview ? 'Add Review' : 'Hide Add Review'}
              </button>
            </div>
          )}
          {menu === 'description' && (
            <div
              data-aos-once='true'
              data-aos='fade-in'
              data-aos-duration='500'>
              <h1>Description</h1>
              <p>{product.description}</p>
            </div>
          )}
          {menu === 'details' && (
            <div
              data-aos-once='true'
              data-aos='fade-in'
              data-aos-duration='500'>
              <h1>details</h1>
              <p>{product.description}</p>
            </div>
          )}
        </div>
        <h1
          style={{
            textAlign: 'center',
            padding: '1rem 0',
          }}>
          Related Products
        </h1>
        {productsByCategory && productsByCategory.length !== 0 && (
          <div className='featured_products' style={{ width: '100%' }}>
            {productsByCategory
              .filter((item) => item._id !== product._id)
              .slice(0, 4)
              .map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
