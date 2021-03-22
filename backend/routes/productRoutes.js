import express from 'express'
import {
  getAllProducts,
  getProductDetail,
  deleteProduct,
  createProduct,
  updateProduct,
  addReview,
  getTopProducts,
  getProductsByCategory,
} from '../controllers/productControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getAllProducts)
router.get('/top', getTopProducts)
router.get('/category/:category', getProductsByCategory)
router.route('/addProduct').post(protect, admin, createProduct)
router.route('/updateProduct/:id').put(protect, admin, updateProduct)
router.route('/reviews/:id').post(protect, addReview)
router.route('/:id').get(getProductDetail).delete(protect, admin, deleteProduct)
export default router
