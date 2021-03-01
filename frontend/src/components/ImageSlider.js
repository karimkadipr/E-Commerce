import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTopProducts } from '../actions/productActions'
import './styles/ImageSlider.css'
import { ReactComponent as LeftSvg } from './images/left-arrow.svg'
import { ReactComponent as RightSvg } from './images/right-chevron.svg'
import { CSSTransition } from 'react-transition-group'

function ImageSlider() {
  const [current, setCurrent] = useState(0)

  const dispatch = useDispatch()

  const getTopProductsValues = useSelector((state) => state.getTopProducts)
  const { topProducts } = getTopProductsValues
  const length = topProducts.length
  useEffect(() => {
    dispatch(getTopProducts())
  }, [dispatch])
  const NextImage = () => {
    setCurrent(() => (current >= length - 1 ? 0 : current + 1))
  }
  const prevImage = () => {
    setCurrent(() => (current <= 0 ? length - 1 : current - 1))
  }

  return (
    <section className='Container'>
      <LeftSvg className='LeftButton' onClick={prevImage} />
      <RightSvg className='rightButton' onClick={NextImage} />
      {topProducts.map((slide, index) => {
        return (
          <div className='imageItem' key={index}>
            <CSSTransition
              in={index === current}
              timeout={500}
              classNames='image-slider'
              unmountOnExit>
              <img className='image' src={slide.image} alt='Nothing to show' />
            </CSSTransition>
          </div>
        )
      })}
    </section>
  )
}

export default ImageSlider
