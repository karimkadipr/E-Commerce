import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import { useSelector, useDispatch } from 'react-redux'
import { getListProducts } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import { Link } from 'react-router-dom'
import Paginate from '../components/Paginate'
import RatingComponent from '../components/RatingComponent'
import Carousel from './Test'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import './styles/homepage.css'
import Message from '../components/DeliveredPaid'

const HomePage = ({ history, match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const getProducts = useSelector((state) => state.getProducts)
  const { error, products, page, pages } = getProducts

  useEffect(() => {
    dispatch(getListProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  const handleAddToCart = (id) => {
    dispatch(addToCart(id, 1))
    history.push('/cart')
  }
  return (
    <>
      <Meta />
      <div className='body_with_footer'>
        <div className='body_without_footer'>
          <Carousel />
          <div className='container_global_homepage'>
            <h1>Products</h1>
            <div className='homepage_Container'>
              {error ? (
                <Message color='red'>{error}</Message>
              ) : (
                products.map((product) => (
                  <div
                    to={`/order/${product._id}`}
                    key={product._id}
                    className='product_item_container'>
                    <Link to={`/order/${product._id}`} className='image_link'>
                      <img
                        className='image_product_home'
                        src={product.image}
                        alt={product.name}
                      />
                    </Link>
                    <div className='title_price_rating'>
                      <div className='title_price_rating_right'>
                        <Link to={`/order/${product._id}`}>{product.name}</Link>
                      </div>
                      <div className='title_price_rating_left'>
                        ${product.price}
                      </div>
                    </div>
                    <div className='rating_container'>
                      <RatingComponent rating={product.rating} />
                    </div>
                    <div className='addToCartButton'>
                      {product.countInStock === 0 ? (
                        <p>Unavailable</p>
                      ) : (
                        <button
                          className='btn_add_cart_home_screen'
                          onClick={() => handleAddToCart(product._id)}>
                          <AddShoppingCartIcon />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            <Paginate
              className='pagination_container'
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
