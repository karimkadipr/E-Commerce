import express from 'express'
import {
  authUser,
  RegisterUser,
  updateUser,
  getUserDetails,
  getAllUsers,
  deleteUserById,
  adminGetUserDetails,
  adminUpdateUser,
} from '../controllers/userControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/signup').post(RegisterUser)
router.route('/profile').put(protect, updateUser).get(protect, getUserDetails)
router
  .route('/admin/users')
  .get(protect, admin, getAllUsers)
  .delete(deleteUserById)
router
  .route('/admin/users/:id')
  .get(protect, admin, adminGetUserDetails)
  .put(protect, admin, adminUpdateUser)

export default router
