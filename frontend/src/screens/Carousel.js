import React from 'react'
import './styles/Test.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core'
import 'swiper/swiper-bundle.css'
import './styles/carousel.scss'
import 'swiper/swiper.scss'
import { Link } from 'react-router-dom'

const Carousel = ({ products }) => {
  SwiperCore.use([Navigation, Pagination, Scrollbar])

  return (
    <Swiper
      className='swiper-home-page'
      slidesPerView={1}
      pagination={{ clickable: true }}>
      {products.slice(5, 10).map((product) => (
        <SwiperSlide key={product._id}>
          <div className='carousel_info'>
            <p>{product.name}</p>
            <p>${product.price}</p>
            <Link to={`/category/${product.category}`}>Shop Category</Link>
          </div>
          <img
            src='/uploads/slideshow4-1-1800x785_1800x785.jpg'
            alt={product.name}
            className='image_carousel'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel
