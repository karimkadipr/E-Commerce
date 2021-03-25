import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAllOrders,
  markAsDelivered,
  deleteOrderById,
} from '../actions/orderActions'
import './styles/adminOrdersScreen.css'
import {
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const AdminOrdersScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getAllOrdersValues = useSelector((state) => state.getAllOrders)
  const { orders } = getAllOrdersValues

  const markAsDeliveredValues = useSelector((state) => state.markAsDelivered)
  const { success: deliveredSuccess } = markAsDeliveredValues

  const deleteOrderByIdValues = useSelector((state) => state.deleteOrderById)
  const { success: deleteSuccess } = deleteOrderByIdValues

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/')
    }
    if (!userInfo) {
      history.push('/')
    }
    dispatch(getAllOrders())
  }, [deliveredSuccess, dispatch, history, userInfo, deleteSuccess])

  const handleClick = (id) => {
    history.push(`/orderDetails/${id}`)
  }

  const markAsDeliveredById = (id) => {
    dispatch(markAsDelivered(id))
  }

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrderById(id))
  }
  return (
    <div className='all_orders_container'>
      <h1>Orders :</h1>

      <div>
        <TableContainer
          className='large_table_orders'
          component={Paper}
          style={{
            margin: '1rem 0 2rem 0',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align='center'>USER</TableCell>
                <TableCell align='center'>DATE</TableCell>
                <TableCell align='center'>TOTAL</TableCell>
                <TableCell align='center'>PAID</TableCell>
                <TableCell align='center'>DELIVERED</TableCell>
                <TableCell align='center'>DETAILS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell component='th' scope='row'>
                      {order._id}
                    </TableCell>
                    <TableCell align='center'>{order.user.name}</TableCell>
                    <TableCell align='center'>
                      {order.createdAt.substring(0, 10)}
                    </TableCell>
                    <TableCell align='center'>
                      ${order.totalPrice.toFixed(2)}
                    </TableCell>
                    {order.isPaid ? (
                      <TableCell align='center'>
                        Paid At : {order.paidAt.substring(0, 10)}
                      </TableCell>
                    ) : (
                      <TableCell align='center'>Not Paid</TableCell>
                    )}
                    {order.isDelivered ? (
                      <TableCell align='center'>
                        Delivered At : {order.deliveredAt.substring(0, 10)}
                      </TableCell>
                    ) : (
                      <TableCell align='center'>
                        <button
                          className='show_more_less_button'
                          onClick={() => markAsDeliveredById(order._id)}>
                          Mark as delivered
                        </button>
                      </TableCell>
                    )}
                    <TableCell align='center'>
                      <button
                        className='orders_list_buttons_edit'
                        onClick={() => handleClick(order._id)}>
                        <EditIcon />
                      </button>{' '}
                      <button
                        className='orders_list_buttons_delete'
                        onClick={() => handleDeleteOrder(order._id)}>
                        <DeleteIcon />
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
              className='small_table_orders'
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
                        className='orders_list_buttons_edit'
                        onClick={() => handleClick(order._id)}>
                        <EditIcon />
                      </button>{' '}
                      <button
                        className='orders_list_buttons_delete'
                        onClick={() => handleDeleteOrder(order._id)}>
                        <DeleteIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ))}
      </div>
    </div>
  )
}

export default AdminOrdersScreen
