import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getListProducts } from '../actions/productActions'
import { Link } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCard from '../components/ProductCard'
import Message from '../components/DeliveredPaid'
import { ReactComponent as EmptyStoreSvg } from './images/undraw_social_update_puv0.svg'
import './styles/homepage.scss'
import Meta from '../components/Meta'

const HomePage = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const getProducts = useSelector((state) => state.getProducts)
  const { error, products, page, pages } = getProducts

  useEffect(() => {
    dispatch(getListProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      <div className='body_with_footer'>
        <div className='body_without_footer'>
          <div className='container_global_homepage'>
            <h1>Search Result</h1>
            <Link to='/' className='show_more_less_button'>
              Go Home
            </Link>
            <div className='featured_products'>
              {error ? (
                <Message color='red'>{error}</Message>
              ) : products.length === 0 ? (
                <div className='No_items_found'>
                  <div>
                    <EmptyStoreSvg style={{ width: 500, height: 'auto' }} />
                  </div>
                  <div>
                    No products found - <Link to='/'> Home page</Link>
                  </div>
                </div>
              ) : (
                products.map((product) => (
                  <ProductCard product={product} key={product._id} />
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
