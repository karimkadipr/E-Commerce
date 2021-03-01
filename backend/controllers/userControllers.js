import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

/* const authUser = asyncHandler(async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const user = await User.findOne({ email: email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error('email not found')
  }
}) */

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.status(200)
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Email and password does not match')
  }
})

const RegisterUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body

  const checkUser = await User.findOne({ email })

  if (checkUser) {
    res.status(400)
    throw new Error('Email already used')
  }
  const newUser = new User({
    email,
    name,
    password,
  })

  await newUser.save()

  if (newUser) {
    res.json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    })
  } else {
    res.status(400)
    throw new Error('Problem Occured')
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.email = req.body.email || user.email
    user.name = req.body.name || user.name
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('Must be connected')
  }
})

const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('user does not exist')
  }
})

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.json(users)
  } else {
    res.status(404)
    throw new Error('error occured')
  }
})

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.headers.id)

  if (user) {
    await user.remove()
    res.json('user has been deleted')
  }
})

const adminUpdateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.email = req.body.email || user.email
    user.name = req.body.name || user.name
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('Must be connected')
  }
})

const adminGetUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('error occured ')
  }
})

export {
  authUser,
  RegisterUser,
  updateUser,
  getUserDetails,
  getAllUsers,
  deleteUserById,
  adminUpdateUser,
  adminGetUserDetails,
}
