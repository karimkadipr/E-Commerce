import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopProducts } from '../actions/productActions'
import './styles/Test.css'
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'

const Test = () => {
  const dispatch = useDispatch()

  const getTopProductsValues = useSelector((state) => state.getTopProducts)
  const { success } = getTopProductsValues

  const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    autoplay: {
      delay: 3000,
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })
  useEffect(() => {
    dispatch(getTopProducts())
  }, [dispatch])

  const arr = [
    {
      src:
        'https://www.geekzonedz.com/modules/pst_imageslider/views/img/3b4ffa8ba62638a610f98ee6ed8d559a3425cbfb_slidergz5.jpg',
    },
    {
      src:
        'https://www.geekzonedz.com/modules/pst_imageslider/views/img/b522010b7372ab42ca21fbae39ae82fc79cdc3a7_slidergz3.jpg',
    },
    {
      src:
        'https://www.geekzonedz.com/modules/pst_imageslider/views/img/2d12dc2f01fb7ceb80398df9617b7c5b50e7ba84_slidergz.jpg',
    },
    {
      src:
        'https://www.geekzonedz.com/modules/pst_imageslider/views/img/83cf4bb9ddaa907b2020834b20e389951504e11c_slide_1_FORTHE.jpg',
    },
  ]
  return (
    <div>
      <div class='swiper-container'>
        <div class='swiper-wrapper'>
          {success &&
            arr.map((img) => {
              return (
                <div key={img.src} class='swiper-slide'>
                  <img
                    class='swiper-slide'
                    src={img.src}
                    alt='Nothing loaded'
                  />
                </div>
              )
            })}
        </div>

        <div class='swiper-pagination'></div>
        <div class='swiper-button-prev'></div>
        <div class='swiper-button-next'></div>
        <div class='swiper-scrollbar'></div>
      </div>
    </div>
  )
}

export default Test
