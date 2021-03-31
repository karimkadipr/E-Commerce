import React, { useEffect, useRef, useState } from 'react'
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
import { TransitionGroup } from 'react-transition-group'
import { CSSTransition } from 'react-transition-group'

const AdminOrdersScreen = ({ history }) => {
  const [menuHeight, setMenuHeight] = useState(null)
  const dispatch = useDispatch()
  const ref = useRef(null)
  const cssRef = useRef(null)
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

  // height animation
  function calcHeightEnter(el) {
    setMenuHeight(ref.current.clientHeight)
  }
  function calcHeightExit(el) {
    const height = el.offsetHeight
    setMenuHeight(height * (orders.length - 1) + cssRef.current.clientHeight)
  }

  useEffect(() => {
    function handleResize() {
      setMenuHeight(ref.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <div className='all_orders_container'>
      <h1>Orders :</h1>

      <div>
        <TableContainer
          className='large_table_orders'
          component={Paper}
          style={{
            height: menuHeight,
            transition: ' height 500ms ',
            margin: '1rem 0 2rem 0',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            overflow: 'hidden',
          }}>
          <Table ref={ref} aria-label='simple table'>
            <TableHead ref={cssRef}>
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
            <TransitionGroup component={TableBody}>
              {orders &&
                orders.map((order) => (
                  <CSSTransition
                    key={order._id}
                    classNames='item-list'
                    timeout={500}
                    onEnter={calcHeightEnter}
                    onExit={calcHeightExit}>
                    <TableRow>
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
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </Table>
        </TableContainer>
        <TableContainer className='small_table_orders' component={Paper}>
          <TransitionGroup component={Table}>
            {orders &&
              orders.map((order) => (
                <CSSTransition
                  key={order._id}
                  classNames='item-list'
                  timeout={500}>
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
                </CSSTransition>
              ))}
          </TransitionGroup>
        </TableContainer>
      </div>
    </div>
  )
}

export default AdminOrdersScreen
