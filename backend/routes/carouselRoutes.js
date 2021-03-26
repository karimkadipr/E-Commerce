import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  addProductCarousel,
  getProductCarousel,
  updateProductCarousel,
  deleteProductCarousel,
  getOneProductCarousel,
} from '../controllers/carouselController.js'

const router = express.Router()

router
  .route('/')
  .post(protect, admin, addProductCarousel)
  .get(protect, admin, getProductCarousel)

router
  .route('/:id')
  .put(protect, admin, updateProductCarousel)
  .delete(protect, admin, deleteProductCarousel)
  .get(protect, admin, getOneProductCarousel)

export default router
