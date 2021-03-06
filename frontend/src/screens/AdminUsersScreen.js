import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AdminGetAllUsers, deleteUser } from '../actions/userActions'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import './styles/adminUsersScreen.css'
import {
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { GET_USER_BY_ID_RESET } from '../constants/userConstants'

const AdminUsersScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getAllUsers = useSelector((state) => state.getAllUsers)
  const { users } = getAllUsers

  const deleteUserReducer = useSelector((state) => state.deleteUser)
  const { success: deleteSuccess } = deleteUserReducer

  const adminUpdateUser = useSelector((state) => state.adminUpdateUser)
  const { success: updateSuccess } = adminUpdateUser

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/')
    }
    if (!userInfo) {
      history.push('/')
    }
    dispatch({ type: GET_USER_BY_ID_RESET })
    dispatch(AdminGetAllUsers())
  }, [dispatch, deleteSuccess, history, userInfo, updateSuccess])

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }

  const goToDetailsPage = (id) => {
    history.push(`/admin/users/${id}`)
  }

  return (
    <div>
      <div className='users_container'>
        <h1>Users : </h1>
        <TableContainer
          className='large_table_users'
          component={Paper}
          style={{
            margin: '1rem 0 2rem 0',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell align='center'>User Name</TableCell>
                <TableCell align='center'>User Email</TableCell>
                <TableCell align='center'>Admin</TableCell>
                <TableCell align='center'>Delete / Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell component='th' scope='row'>
                      {user._id}
                    </TableCell>
                    <TableCell align='center'>{user.name}</TableCell>
                    <TableCell align='center'>{user.email}</TableCell>
                    {user.isAdmin ? (
                      <TableCell align='center'>Admin</TableCell>
                    ) : (
                      <TableCell align='center'>Not Admin</TableCell>
                    )}

                    <TableCell align='center'>
                      <button
                        className='admin_users_edit_btn'
                        onClick={() => goToDetailsPage(user._id)}>
                        <EditIcon />
                      </button>{' '}
                      <button
                        className='admin_users_delete_btn'
                        onClick={() => deleteUserHandler(user._id)}>
                        <DeleteIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {users &&
          users.map((user) => (
            <TableContainer
              className='small_table_users'
              key={user._id}
              component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell variant='head'>User ID</TableCell>
                    <TableCell>{user._id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>User Name</TableCell>
                    <TableCell>{user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>User Email</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Admin</TableCell>
                    {user.isAdmin ? (
                      <TableCell>Admin</TableCell>
                    ) : (
                      <TableCell>Not admin</TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Delete / Edit</TableCell>
                    <TableCell>
                      <button
                        className='admin_users_edit_btn'
                        onClick={() => goToDetailsPage(user._id)}>
                        <EditIcon />
                      </button>{' '}
                      <button
                        className='admin_users_delete_btn'
                        onClick={() => deleteUserHandler(user._id)}>
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

export default AdminUsersScreen
