import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  if (products) {
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
  } else {
    res.status(404)
    throw new Error('products not found')
  }
})

const getProductDetail = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('wrong ID')
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json('Product has been removed')
  } else {
    throw new Error('Product not found')
  }
})

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  const {
    name,
    price,
    user,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body

  if (product) {
    product.name = name || product.name
    product.price = price || product.price
    product.user = user || product.user
    product.image = image || product.image
    product.brand = brand || product.brand
    product.category = category || product.category
    product.countInStock = countInStock || product.countInStock
    product.numReviews = numReviews || product.numReviews
    product.description = description || product.description
  } else {
    throw new Error('product does not exist')
  }

  const updatedProduct = await product.save()
  res.json(updatedProduct)
})

const addReview = asyncHandler(async (req, res) => {
  const { rating, comment, title } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Already reviewed')
    } else {
      const review = {
        name: req.user.name,
        title,
        rating,
        comment,
        user: req.user._id,
      }

      product.reviews.push(review)

      product.numReviews = product.reviews.length

      product.rating =
        product.reviews.reduce(
          (acc, review) => acc + Number(review.rating),
          0
        ) / product.reviews.length

      await product.save()
      res.status(201).json('review added')
    }
  } else {
    res.status(404)
    res.json('product does not exist')
  }
})

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  if (products) {
    res.json(products)
  }
})

export {
  getAllProducts,
  getProductDetail,
  deleteProduct,
  createProduct,
  updateProduct,
  addReview,
  getTopProducts,
}
