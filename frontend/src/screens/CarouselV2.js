import React from 'react'
import './styles/Test.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core'
import 'swiper/swiper-bundle.css'
import './styles/carouselv2.scss'
import 'swiper/swiper.scss'

import GridHomePage from '../components/GridHomePage'

const CarouselV2 = ({ products, handleAddToCart }) => {
  SwiperCore.use([Navigation, Pagination, Scrollbar])
  let menu = ['Shoes', 'Fashion', 'Electronics']
  return (
    <Swiper
      className='swiper-grid'
      spaceBetween={25}
      slidesPerView={1}
      navigation={{
        prevEl: '.prev',
        nextEl: '.next',
      }}
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + menu[index] + '</span>'
        },
      }}>
      <SwiperSlide>
        <GridHomePage
          products={products.slice(5, 10)}
          handleAddToCart={handleAddToCart}
        />
      </SwiperSlide>
      <SwiperSlide>
        <GridHomePage
          products={products.slice(10, 15)}
          handleAddToCart={handleAddToCart}
        />
      </SwiperSlide>
      <SwiperSlide>
        <GridHomePage
          products={products.slice(15, 20)}
          handleAddToCart={handleAddToCart}
        />
      </SwiperSlide>
    </Swiper>
  )
}

export default CarouselV2
