import express from 'express'
import {
  addOrder,
  getOrderById,
  updateToPaid,
  getMyOrders,
  deleteMyOrders,
  getAllOrders,
  markAsDelivered,
  deleteOrderById,
} from '../controllers/orderControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/shipping').post(protect, addOrder)
router
  .route('/myOrders')
  .get(protect, getMyOrders)
  .delete(protect, deleteMyOrders)
router.route('/:id').get(protect, getOrderById).put(protect, updateToPaid)
router.route('/admin/allOrders').get(protect, admin, getAllOrders)
router.route('/admin/order/:id').delete(protect, deleteOrderById)
router.route('/admin/:id').put(protect, admin, markAsDelivered)

export default router
