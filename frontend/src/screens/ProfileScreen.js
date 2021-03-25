import React, { useState, useEffect } from 'react'
import './styles/profileScreen.css'
import {
  Input,
  InputAdornment,
  IconButton,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { updateUser } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllMyOrders,
  deleteMyOrders,
  deleteOrderById,
} from '../actions/orderActions'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getMyOrders = useSelector((state) => state.getMyOrders)
  const { orders } = getMyOrders

  const deleteOrderByIdValue = useSelector((state) => state.deleteOrderById)
  const { success } = deleteOrderByIdValue

  const updateUserValues = useSelector((state) => state.updateUser)
  const { success: updateSuccess } = updateUserValues

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
    dispatch(getAllMyOrders())
  }, [userInfo.name, userInfo.email, dispatch, success, updateSuccess])

  const handleUpdate = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      dispatch(updateUser(email, password, name))
    }
  }

  const resetOrders = () => {
    dispatch(deleteMyOrders())
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrderById(id))
  }

  return (
    <div className='profile_container'>
      <form className='form_update_Profile' onSubmit={handleUpdate}>
        <div className='input_sign_up_container'>
          <h3>Personal information</h3>

          <Input
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
            fullWidth={true}
          />
        </div>
        <div className='input_sign_up_container'>
          <Input
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth={true}
          />
        </div>
        <div className='input_sign_up_container'>
          <Input
            id='standard-adornment-password'
            placeholder='Enter new Password'
            fullWidth={true}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <div className='input_sign_up_container'>
          <Input
            id='standard-adornment-confirm-password'
            placeholder='Confirm new Password'
            fullWidth={true}
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowConfirmPassword}>
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <button className='submit_update_button' type='submit'>
          Update
        </button>
      </form>

      <div className='table_order_profile'>
        <h3> Your orders : </h3>
        <TableContainer
          className='large_table_profile'
          component={Paper}
          style={{
            margin: '1rem 0 1rem 0',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align='center'>Date</TableCell>
                <TableCell align='center'>Total</TableCell>
                <TableCell align='center'>Paid</TableCell>
                <TableCell align='center'>Delivered</TableCell>
                <TableCell align='center'>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell component='th' scope='row'>
                      {order._id}
                    </TableCell>
                    <TableCell align='center'>
                      {order.createdAt.substring(0, 10)}
                    </TableCell>
                    <TableCell align='center'>
                      ${order.totalPrice.toFixed(2)}
                    </TableCell>
                    {order.isPaid ? (
                      <TableCell align='center'>
                        {order.paidAt.substring(0, 10)}
                      </TableCell>
                    ) : (
                      <TableCell align='center'>Not Paid</TableCell>
                    )}
                    {order.isDelivered ? (
                      <TableCell align='center'>
                        {order.deliveredAt.substring(0, 10)}
                      </TableCell>
                    ) : (
                      <TableCell align='center'>Not Delivered</TableCell>
                    )}
                    <TableCell align='center'>
                      <button
                        className='edit_orders_button'
                        onClick={() =>
                          history.push(`/orderDetails/${order._id}`)
                        }>
                        <EditIcon />
                      </button>{' '}
                      <button
                        className='delete_orders_button'
                        onClick={() => handleDeleteOrder(order._id)}>
                        <DeleteIcon />{' '}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {orders &&
          orders.map((order) => (
            <TableContainer
              className='small_table_profile'
              key={order._id}
              component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell variant='head'>Order ID</TableCell>
                    <TableCell>{order._id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Date</TableCell>
                    <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Total</TableCell>
                    <TableCell>${order.totalPrice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Paid</TableCell>
                    {order.isPaid ? (
                      <TableCell>Paid</TableCell>
                    ) : (
                      <TableCell>Not Paid</TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Delivered</TableCell>
                    {order.isDelivered ? (
                      <TableCell>Delivered</TableCell>
                    ) : (
                      <TableCell>Not Delivered</TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Details</TableCell>
                    <TableCell>
                      <button
                        className='edit_orders_button'
                        onClick={() =>
                          history.push(`/orderDetails/${order._id}`)
                        }>
                        <EditIcon />
                      </button>{' '}
                      <button
                        className='delete_orders_button'
                        onClick={() => handleDeleteOrder(order._id)}>
                        <DeleteIcon />{' '}
                      </button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        <button className='delete_orders_button' onClick={resetOrders}>
          Delete All
        </button>
      </div>
    </div>
  )
}

export default ProfileScreen
