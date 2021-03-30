import React, { useEffect } from 'react'
import './styles/Test.css'
import { useSelector, useDispatch } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getItemCarousel } from '../actions/carouselActions'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
} from 'swiper/core'
import 'swiper/swiper-bundle.css'
import './styles/carousel.scss'
import 'swiper/swiper.scss'
import { Link } from 'react-router-dom'

const Carousel = () => {
  const dispatch = useDispatch()

  const getItemCarouselValue = useSelector((state) => state.getItemCarousel)
  const { carouselItems } = getItemCarouselValue

  useEffect(() => {
    dispatch(getItemCarousel())
  }, [carouselItems])

  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay])

  return (
    <Swiper
      className='swiper-home-page'
      slidesPerView={1}
      navigation={{
        prevEl: '.prev',
        nextEl: '.next',
      }}
      loop={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}>
      {carouselItems &&
        carouselItems.length !== 0 &&
        carouselItems.map((product) => (
          <SwiperSlide key={product._id}>
            <div className='carousel_info'>
              <p>{product.title}</p>
              <Link to={`/category/${product.category}`}>Shop Category</Link>
            </div>
            <img
              src={product.image}
              alt={product.title}
              className='image_carousel'
            />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default Carousel
