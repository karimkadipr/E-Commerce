import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getListProducts } from '../actions/productActions'
import './styles/adminProductsScreen.css'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import { deleteProduct, createProduct } from '../actions/productActions'
import {
  UPDATE_PRODUCT_RESET,
  PRODUCT_DETAIL_RESET,
} from '../constants/productConstants'
import Paginate from '../components/Paginate'
import {
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'

const AdminProductsScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getProducts = useSelector((state) => state.getProducts)
  const { products, page, pages } = getProducts

  const deleteProductFct = useSelector((state) => state.deleteProduct)
  const { success: successDelete } = deleteProductFct

  const createProductValues = useSelector((state) => state.createProduct)
  const { sampleProduct, success: successCreate } = createProductValues

  const updateProductValues = useSelector((state) => state.updateProduct)
  const { success: successUpdate } = updateProductValues

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/')
    }
    if (!userInfo) {
      history.push('/')
    }
    dispatch({
      type: UPDATE_PRODUCT_RESET,
    })
    dispatch({
      type: PRODUCT_DETAIL_RESET,
    })

    dispatch(getListProducts('', pageNumber))
    if (successCreate) {
      history.push(`/admin/products/editproduct/${sampleProduct._id}`)
    }
  }, [
    dispatch,
    sampleProduct,
    userInfo,
    successCreate,
    successDelete,
    successUpdate,
    pageNumber,
    history,
  ])

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }

  const handleCreateProduct = () => {
    dispatch(createProduct())
  }

  const handleEditProduct = (id) => {
    history.push(`/admin/products/editproduct/${id}`)
  }

  return (
    <div>
      <div className='products_page_Container'>
        <div className='title_button_products_admin'>
          <h1> Products : </h1>
          <div className='product_Btn'>
            <button
              className='admin_add_products_btn'
              onClick={handleCreateProduct}>
              <AddIcon />
              <p>New Product</p>
            </button>
          </div>
        </div>
        <TableContainer
          style={{
            margin: '1rem 0 2rem 0',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}
          component={Paper}
          className='large_table_products'>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell align='center'>Product Name</TableCell>
                <TableCell align='center'>Price</TableCell>
                <TableCell align='center'>Brand</TableCell>
                <TableCell align='center'>Edit / Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell component='th' scope='row'>
                      {product._id}
                    </TableCell>
                    <TableCell align='center'>{product.name}</TableCell>
                    <TableCell align='center'>${product.price}</TableCell>
                    <TableCell align='center'>{product.brand}</TableCell>
                    <TableCell align='center'>
                      <button
                        className='admin_products_edit_btn'
                        onClick={() => handleEditProduct(product._id)}>
                        <EditIcon />
                      </button>{' '}
                      <button
                        className='admin_products_delete_btn'
                        onClick={() => handleDelete(product._id)}>
                        <DeleteIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {products &&
          products.map((product) => (
            <TableContainer
              className='small_table_products'
              key={product._id}
              component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell variant='head'>Product ID</TableCell>
                    <TableCell>{product._id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Product Name</TableCell>
                    <TableCell>{product.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Price</TableCell>
                    <TableCell>${product.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Brand</TableCell>
                    <TableCell>{product.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Edit / Delete</TableCell>
                    <TableCell>
                      <button
                        className='admin_products_edit_btn'
                        onClick={() => handleEditProduct(product._id)}>
                        <EditIcon />
                      </button>{' '}
                      <button
                        className='admin_products_delete_btn'
                        onClick={() => handleDelete(product._id)}>
                        <DeleteIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ))}

        <Paginate isAdmin={true} pages={pages} page={page} />
      </div>
    </div>
  )
}

export default AdminProductsScreen
