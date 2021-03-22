import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import { useSelector, useDispatch } from 'react-redux'
import { getListProducts } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import Paginate from '../components/Paginate'
import Carousel from './Carousel'
import Message from '../components/DeliveredPaid'
import CarouselV2 from './CarouselV2'
import { Link } from 'react-router-dom'
import './styles/homepage.scss'

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
      {products.length !== 0 && <Carousel products={products} />}
      <div className='body_with_footer'>
        <div className='body_without_footer'>
          <div className='container_global_homepage'>
            <h1>Trending categories</h1>

            {error && products.length !== 0 ? (
              <Message color='red'>{error}</Message>
            ) : (
              <>
                <CarouselV2
                  products={products}
                  handleAddToCart={handleAddToCart}
                />
                <h1>Featured Products</h1>
                <div className='featured_products'>
                  {products.slice(5, 17).map((product) => (
                    <div className='featured_product'>
                      <Link
                        to={`/order/${product._id}`}
                        className='image_holder_home_page'>
                        <img src={product.image} alt={product.name} />
                      </Link>
                      <p className='p_product_card'>{product.brand}</p>
                      <p>{product.name}</p>
                      <p>{product.category}</p>
                      <p className='p_product_card'>${product.price}</p>
                    </div>
                  ))}
                </div>
                <Paginate
                  className='pagination_container'
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ''}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
