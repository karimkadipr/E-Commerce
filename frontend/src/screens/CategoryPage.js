import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import { getProductsByCategory } from '../actions/productActions'
import { GET_PRODUCTS_CATEGORY_RESET } from '../constants/productConstants'
import './styles/categoryPage.scss'
import AppsIcon from '@material-ui/icons/Apps'
import ListIcon from '@material-ui/icons/List'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

const CategoryPage = ({ match }) => {
  const [productsNumber, setProductsNumber] = useState(12)
  const [pageNumber, setPageNumber] = useState(1)
  const [productLayout, setProductLayout] = useState('grid')
  const [sortCriteria, setSortCriteria] = useState('price')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const categoryId = match.params.category
  const dispatch = useDispatch()

  const getProductsByCategoryValues = useSelector(
    (state) => state.getProductsByCategory
  )
  const { productsByCategory } = getProductsByCategoryValues

  useEffect(() => {
    if (productsByCategory && productsByCategory.length === 0) {
      dispatch(getProductsByCategory(categoryId))
    }
  }, [dispatch, productsByCategory])

  const Arr = [3, 5, 7, 12, 24, 36]
  return (
    <div className='category_page_container'>
      <div className='sidebar_category_page'>
        <div>
          <h1>Categories</h1>
          <Link
            onClick={() => {
              dispatch({ type: GET_PRODUCTS_CATEGORY_RESET })
            }}
            to='/category/Shoes'>
            Shoes
          </Link>
          <Link
            onClick={() => {
              dispatch({ type: GET_PRODUCTS_CATEGORY_RESET })
            }}
            to='/category/Fashion'>
            Fashion
          </Link>
          <Link
            onClick={() => {
              dispatch({ type: GET_PRODUCTS_CATEGORY_RESET })
            }}
            to='/category/Electronics'>
            Electronics
          </Link>
        </div>
        <div>
          <h1>Price Range :</h1>
          <p
            onClick={() => {
              setMinPrice(0)
              setMaxPrice(50)
            }}>
            0$ - 50$
          </p>
          <p
            onClick={() => {
              setMinPrice(50)
              setMaxPrice(100)
            }}>
            50$ - 100$
          </p>
          <p
            onClick={() => {
              setMinPrice(100)
              setMaxPrice(150)
            }}>
            100$ - 150$
          </p>
          <p>
            <input
              type='number'
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type='number'
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </p>
        </div>
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
                <MenuItem value={'name'}>name</MenuItem>
                <MenuItem value={'price'}>price</MenuItem>
                <MenuItem value={'createdAt'}>Most Recent</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {productLayout === 'grid' && (
          <>
            <div className='content_category_page'>
              {productsByCategory &&
                productsByCategory !== 0 &&
                productsByCategory
                  .slice(
                    productsNumber * (pageNumber - 1),
                    productsNumber * pageNumber
                  )
                  .filter(
                    (product) =>
                      product.price >= minPrice && product.price <= maxPrice
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
            </div>
            {productsByCategory.length > productsNumber && (
              <div className='page_number_container'>
                {[
                  ...Array(
                    Math.ceil(productsByCategory.length / productsNumber)
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
          </>
        )}

        {productLayout === 'list' && (
          <div className='content_category_page'>
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
