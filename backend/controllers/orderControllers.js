import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('no items in the shop')
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('order does not exist')
  }
})

const updateToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    const newOrder = await order.save()
    res.json(newOrder)
  } else {
    res.status(404)
    throw new Error('order not found')
  }
})

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

const deleteMyOrders = asyncHandler(async (req, res) => {
  await Order.remove({ user: req.user._id })
  res.json('orders deleted')
})

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  if (orders) {
    res.status(201).json(orders)
  } else {
    throw new Error('Orders not found')
  }
})

const markAsDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const newOrder = await order.save()

    res.json(newOrder)
  } else {
    res.status(404)
    throw new Error('Orders not found')
  }
})

const deleteOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    await order.remove()
    res.json('Order has been removed')
  } else {
    res.status(400).json('Order does not exist')
  }
})

export {
  addOrder,
  getOrderById,
  updateToPaid,
  getMyOrders,
  deleteMyOrders,
  getAllOrders,
  markAsDelivered,
  deleteOrderById,
}
