import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { getProductDetails } from '../actions/productActions'
import './styles/sideBarAd.scss'

const SideBarAd = ({ title, products }) => {
  useEffect(() => {
    Aos.init({})
  }, [])

  const dispatch = useDispatch()
  return (
    <div
      className='container_side_bar_ad'
      data-aos-once='true'
      data-aos='zoom-in'
      data-aos-duration='500'>
      <h1 style={{ marginTop: 0, margin: '0.5rem 0' }}>{title}</h1>
      {products.map((product) => (
        <Link
          key={product._id}
          className='sideBar_link_container'
          to={`/order/${product._id}`}
          onClick={() => dispatch(getProductDetails(product._id))}>
          <div className='sideBarAd_item'>
            <img src={product.image} alt={product.name} />
            <div>
              <p>{product.name}</p>
              <p style={{ fontSize: '0.6rem', color: 'grey' }}>
                $ {product.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SideBarAd
