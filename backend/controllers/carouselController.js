import asyncHandler from 'express-async-handler'
import Carousel from '../models/carouselModel.js'

const addProductCarousel = asyncHandler(async (req, res) => {
  const carouselItem = new Carousel({
    image: '/images/sample.jpg',
    title: 'Sample title',
    category: 'sample Category',
  })
  const createCarousel = await carouselItem.save()
  res.status(201).json(createCarousel)
})

const getProductCarousel = asyncHandler(async (req, res) => {
  const carouselItems = await Carousel.find({})
  if (carouselItems) {
    res.status(200).json(carouselItems)
  } else {
    res.status(404)
    throw new Error('No Items found')
  }
})
const updateProductCarousel = asyncHandler(async (req, res) => {
  const { title, image, category } = req.body
  const carouselItem = await Carousel.findById(req.params.id)
  if (carouselItem) {
    ;(carouselItem.title = title || carouselItem.title),
      (carouselItem.image = image || carouselItem.image),
      (carouselItem.category = category || carouselItem.category)
    await carouselItem.save()
    res.json('Carousel Item has been updated')
  } else {
    res.status(404)
    res.json('item not found')
  }
})

const deleteProductCarousel = asyncHandler(async (req, res) => {
  const carouselItem = await Carousel.findById(req.params.id)
  if (carouselItem) {
    await carouselItem.remove()
    res.json('carousel Item removed')
  } else {
    res.status(404).json('carousel Item not found')
  }
})

const getOneProductCarousel = asyncHandler(async (req, res) => {
  const carouselItemId = req.params.id
  const carouselItem = await Carousel.findById(carouselItemId)
  if (carouselItem) {
    res.status(200).json(carouselItem)
  } else {
    res.status(404)
    throw new Error('No Items found')
  }
})

export {
  addProductCarousel,
  getProductCarousel,
  updateProductCarousel,
  deleteProductCarousel,
  getOneProductCarousel,
}
