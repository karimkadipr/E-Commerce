import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import { useSelector, useDispatch } from 'react-redux'
import { getListProducts, getLastProducts } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import Paginate from '../components/Paginate'
import Carousel from './Carousel'
import Message from '../components/DeliveredPaid'
import CarouselV2 from './CarouselV2'
import { OutlinedInput } from '@material-ui/core'
import ProductCard from '../components/ProductCard'
import { ReactComponent as DeliverySvg } from './images/Untitled2.svg'
import { ReactComponent as SupportSvg } from './images/support 1.svg'
import { ReactComponent as GuaranteeSvg } from './images/guarantee1.svg'
import imageNews from './images/bkg_newsletter.jpg'
import './styles/homepage.scss'

const HomePage = ({ history, match }) => {
  const [showMore, setShowMore] = useState(false)
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const getProducts = useSelector((state) => state.getProducts)
  const { error, products, page, pages } = getProducts

  const getLastProductsValues = useSelector((state) => state.getLastProducts)
  const { products: lastProducts } = getLastProductsValues

  useEffect(() => {
    dispatch(getListProducts(keyword, pageNumber))
    dispatch(getLastProducts())
  }, [dispatch, keyword, pageNumber])

  const handleAddToCart = (id) => {
    dispatch(addToCart(id, 1))
    history.push('/cart')
  }
  return (
    <>
      <Meta />
      {products && products.length !== 0 && <Carousel products={products} />}
      <div className='body_with_footer'>
        <div className='body_without_footer'>
          <div className='container_global_homepage'>
            <h1 style={{ textAlign: 'center', margin: '0 0.25rem' }}>
              Trending categories
            </h1>
            <p
              style={{
                fontWeight: '200',
                maxWidth: '100ch',
                textAlign: 'center',
                margin: '0 0.45rem',
              }}>
              The most searched and viewed categories of our store.
            </p>
            {error && products && products.length !== 0 ? (
              <Message color='red'>{error}</Message>
            ) : (
              <>
                <CarouselV2
                  products={products}
                  handleAddToCart={handleAddToCart}
                />
                <h1 style={{ marginTop: '2rem' }}>New Arrivals</h1>
                <p
                  style={{
                    fontWeight: '200',
                    maxWidth: '100ch',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    margin: '0 0.45rem',
                  }}>
                  Discover the newest products of our stores. All the products
                  are listed weekly in store, helping customers capture new
                  collections.
                </p>
                <div className='featured_products'>
                  {lastProducts.map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
                </div>
                <h1 style={{ textAlign: 'center', margin: '0 0.45rem' }}>
                  Best Selling Products
                </h1>
                <p
                  style={{
                    fontWeight: '200',
                    maxWidth: '100ch',
                    textAlign: 'center',
                    margin: '0 0.45rem',
                  }}>
                  Discover the best selling products of our stores. All the
                  products are listed weekly in store, helping customers capture
                  products are best sellers.
                </p>
                <div className='featured_products'>
                  {showMore ? (
                    <>
                      {products.slice(5, 17).map((product) => (
                        <ProductCard product={product} key={product._id} />
                      ))}
                    </>
                  ) : (
                    <>
                      {products.slice(5, 13).map((product) => (
                        <ProductCard product={product} key={product._id} />
                      ))}
                    </>
                  )}
                </div>
                <div className='button_container_show_less'>
                  <button
                    className='show_more_less_button'
                    onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Show Less' : 'Show More'}
                  </button>
                </div>

                <div className='support_delivery_guarantee'>
                  <div>
                    <DeliverySvg
                      style={{ height: '2rem', margin: 8, minWidth: '2rem' }}
                    />
                    Fast Delivery
                  </div>
                  <div>
                    <SupportSvg
                      style={{ height: '2rem', margin: 8, minWidth: '2rem' }}
                    />
                    Support 24/7
                  </div>
                  <div>
                    <GuaranteeSvg
                      style={{ height: '2rem', margin: 8, minWidth: '2rem' }}
                    />
                    Guaranteed Product
                  </div>
                </div>
                <div className='newsletter_container'>
                  <img src={imageNews} alt='newsletter' />
                  <div className='newsletter_content'>
                    <h4>Our News</h4>
                    <h1>NEWSLETTER SIGNUP</h1>
                    <p>
                      Subscribe to our email list and stay up-to-date with all
                      our awesome releases and latest updates.
                    </p>
                    <div>
                      <OutlinedInput
                        type='text'
                        placeholder='Enter your email'
                        fullWidth={true}
                      />

                      <button
                        style={{ marginTop: '0.5rem' }}
                        className='show_more_less_button'>
                        Submit
                      </button>
                    </div>
                  </div>
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
