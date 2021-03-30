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
  .get(getProductCarousel)
  .post(protect, admin, addProductCarousel)

router
  .route('/:id')
  .get(getOneProductCarousel)
  .put(protect, admin, updateProductCarousel)
  .delete(protect, admin, deleteProductCarousel)

export default router
