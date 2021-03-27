import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { getProductsByCategory } from '../actions/productActions'
import './styles/categoryPage.scss'

const CategoryPage = ({ match }) => {
  const categoryId = match.params.category
  const dispatch = useDispatch()

  const getProductsByCategoryValues = useSelector(
    (state) => state.getProductsByCategory
  )
  const { productsByCategory } = getProductsByCategoryValues

  useEffect(() => {
    dispatch(getProductsByCategory(categoryId))
  }, [dispatch])

  return (
    <div className='category_page_container'>
      <div className='sidebar_category_page'>
        <div>
          <h1>Categories</h1>
          <ol style={{ paddingLeft: '1rem' }}>
            <li>Electronics</li>
            <li>Shoes</li>
            <li>Fashion</li>
          </ol>
        </div>
        <div>
          <h1>Price Range :</h1>
          <p>10$ - 50$</p>
          <p>50$ - 100$</p>
          <p>100$ - 150$</p>
        </div>
      </div>
      <div className='main_content_category_page'>
        <div className='category_option_container'>
          <div>
            <span>List</span>
            <span>Container</span>
          </div>
          <div>
            <span> 10</span>
            <span> Sort By</span>
          </div>
        </div>
        <div className='content_category_page'>
          {productsByCategory &&
            productsByCategory !== 0 &&
            productsByCategory.map((product) => (
              <ProductCard
                cardType='category'
                product={product}
                key={product._id}
                style={{ minWidth: 100 }}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
