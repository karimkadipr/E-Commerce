import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import { getListProducts } from '../actions/productActions'
import { getProductsByCategory } from '../actions/productActions'
import './styles/categoryPage.scss'
import AppsIcon from '@material-ui/icons/Apps'
import ListIcon from '@material-ui/icons/List'
import Slider from '@material-ui/core/Slider'
import SideBarAd from '../components/SideBarAd'
import { ReactComponent as NotFoundSvg } from './images/undraw_void_3ggu.svg'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

const CategoryPage = ({ match }) => {
  const [productsNumber, setProductsNumber] = useState(12)
  const [pageNumber, setPageNumber] = useState(1)
  const [productLayout, setProductLayout] = useState('grid')
  const [sortCriteria, setSortCriteria] = useState('price')
  const [price, setPrice] = useState([0, 1000])
  const [priceHolder, setPriceHolder] = useState([0, 1000])

  const categoryId = match.params.category
  const dispatch = useDispatch()

  const getProductsByCategoryValues = useSelector(
    (state) => state.getProductsByCategory
  )
  const { productsByCategory, success } = getProductsByCategoryValues

  const getProducts = useSelector((state) => state.getProducts)
  const { products } = getProducts

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
  useEffect(() => {
    dispatch(getListProducts())
  }, [])

  useEffect(() => {
    if (productsByCategory && productsByCategory.length === 0 && !success) {
      dispatch(getProductsByCategory(categoryId))
    }
    if (productsByCategory && productsByCategory.length !== 0) {
      const min = productsByCategory.sort((a, b) => a.price - b.price)[0].price
      const max = productsByCategory.sort((b, a) => a.price - b.price)[0].price
      setPrice([min, max])
      setPriceHolder([min, max])
    }
  }, [dispatch, productsByCategory, success])

  const Arr = [3, 5, 7, 12, 24, 36]

  const valueText = (value) => {
    return `${value}°C`
  }

  const handleChange = (event, newValue) => {
    setPrice(newValue)
  }

  return (
    <div className='category_page_container'>
      <div className='sidebar_container'>
        <div className='sidebar_category_page'>
          <div>
            <h1>Categories :</h1>
            <Link
              onClick={() => {
                dispatch(getProductsByCategory('Shoes'))
              }}
              to='/category/Shoes'>
              Shoes
            </Link>
            <Link
              onClick={() => {
                dispatch(getProductsByCategory('Fashion'))
              }}
              to='/category/Fashion'>
              Fashion
            </Link>
            <Link
              onClick={() => {
                dispatch(getProductsByCategory('Electronics'))
              }}
              to='/category/Electronics'>
              Electronics
            </Link>
          </div>
          <div>
            <h1>Price Range:</h1>
            <p
              onClick={() =>
                setPrice([
                  Math.ceil(priceHolder[0]),
                  Math.ceil(priceHolder[1] * 0.25),
                ])
              }>
              ${Math.ceil(priceHolder[0])} - ${Math.ceil(priceHolder[1] * 0.25)}
            </p>
            <p
              onClick={() =>
                setPrice([
                  Math.ceil(priceHolder[1] * 0.25),
                  Math.ceil(priceHolder[1] * 0.5),
                ])
              }>
              ${Math.ceil(priceHolder[1] * 0.25)} - $
              {Math.ceil(priceHolder[1] * 0.5)}
            </p>
            <p
              onClick={() =>
                setPrice([
                  Math.ceil(priceHolder[1] * 0.5),
                  Math.ceil(priceHolder[1]),
                ])
              }>
              ${Math.ceil(priceHolder[1] * 0.5)} - ${Math.ceil(priceHolder[1])}
            </p>
            {productsByCategory && productsByCategory !== 0 && (
              <Slider
                value={price}
                min={Math.ceil(priceHolder[0])}
                max={Math.ceil(priceHolder[1])}
                onChange={handleChange}
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
                getAriaValueText={valueText}
              />
            )}
            <p onClick={() => setPrice([priceHolder[0], price[1]])}>
              Minimum : ${price[0]}
            </p>
            <p onClick={() => setPrice([price[0], priceHolder[1]])}>
              Maximum : ${price[1]}
            </p>
          </div>
        </div>
        {products.length !== 0 && (
          <>
            <SideBarAd
              products={products
                .sort((a, b) => a.createdAt - b.createdAt)
                .reverse()
                .slice(0, 3)}
              title='New Arrivals'
            />
            <SideBarAd
              products={products
                .sort((a, b) => a.rating - b.rating)
                .reverse()
                .slice(0, 3)}
              title='Top Rated'
            />
          </>
        )}
      </div>
      <div className='main_content_category_page'>
        <div className='category_option_container'>
          <div>
            <span onClick={() => setProductLayout('grid')}>
              <AppsIcon />
            </span>
            <span onClick={() => setProductLayout('list')}>
              <ListIcon />
            </span>
          </div>
          <div>
            <FormControl className='select_quantity'>
              <InputLabel id='demo-simple-select-label'>Products</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={productsNumber}
                onChange={(e) => {
                  setProductsNumber(e.target.value)
                  setPageNumber(1)
                }}>
                {Arr.map((number) => (
                  <MenuItem key={number} value={number}>
                    {number}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              className='select_quantity'
              style={{ marginLeft: '0.5rem' }}>
              <InputLabel id='demo-simple-select-label'>Sort by :</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}>
                <MenuItem value={'name'}>Alphabetical </MenuItem>
                <MenuItem value={'price'}>Price</MenuItem>
                <MenuItem value={'createdAt'}>Most Recent</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {productLayout === 'grid' && (
          <>
            <div className='content_category_page_grid'>
              {productsByCategory &&
                productsByCategory.length !== 0 &&
                productsByCategory
                  .filter(
                    (product) =>
                      product.price >= price[0] && product.price <= price[1]
                  )
                  .slice(
                    productsNumber * (pageNumber - 1),
                    productsNumber * pageNumber
                  )

                  .sort(function (b, a) {
                    if (a[sortCriteria] > b[sortCriteria]) {
                      if (sortCriteria === 'createdAt') {
                        return 1
                      } else {
                        return -1
                      }
                    }
                    if (b[sortCriteria] > a[sortCriteria]) {
                      if (sortCriteria === 'createdAt') {
                        return -1
                      } else {
                        return 1
                      }
                    }
                    return 0
                  })
                  .map((product) => (
                    <ProductCard
                      cardType='category'
                      product={product}
                      key={product._id}
                    />
                  ))}
              {productsByCategory &&
                productsByCategory.filter(
                  (product) =>
                    product.price >= price[0] && product.price <= price[1]
                ).length === 0 && (
                  <div className='No_products_found_categories'>
                    <h1>No Products Found</h1>
                    <NotFoundSvg />
                  </div>
                )}
            </div>
            {productsByCategory.length > productsNumber && (
              <div className='page_number_container'>
                {[
                  ...Array(
                    Math.ceil(
                      productsByCategory.filter(
                        (product) =>
                          product.price >= price[0] && product.price <= price[1]
                      ).length / productsNumber
                    )
                  ).keys(),
                ].map((item) => (
                  <span
                    style={
                      pageNumber === item + 1
                        ? { border: '1px solid ', borderRadius: 5 }
                        : {}
                    }
                    onClick={() => setPageNumber(item + 1)}>
                    {item + 1}
                  </span>
                ))}
              </div>
            )}
            {products.length !== 0 && dimensions.width < 750 && (
              <>
                <SideBarAd
                  products={products
                    .sort((a, b) => a.createdAt - b.createdAt)
                    .reverse()
                    .slice(0, 3)}
                  title='New Arrivals'
                />
                <SideBarAd
                  products={products
                    .sort((a, b) => a.rating - b.rating)
                    .reverse()
                    .slice(0, 3)}
                  title='Top Rated'
                />
              </>
            )}
          </>
        )}

        {productLayout === 'list' && (
          <div className='content_category_page_grid'>
            {productsByCategory &&
              productsByCategory !== 0 &&
              productsByCategory
                .slice(
                  productsNumber * (pageNumber - 1),
                  productsNumber * pageNumber
                )
                .map((product) => <div></div>)}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
