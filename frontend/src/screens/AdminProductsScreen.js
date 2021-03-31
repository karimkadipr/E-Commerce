import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getListProducts } from '../actions/productActions'
import './styles/adminProductsScreen.scss'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'
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
import { TransitionGroup } from 'react-transition-group'
import { CSSTransition } from 'react-transition-group'

const AdminProductsScreen = ({ history, match }) => {
  const [menuHeight, setMenuHeight] = useState(null)
  const ref = useRef(null)
  const cssRef = useRef(null)
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

  // height animation
  function calcHeightEnter(el) {
    setMenuHeight(ref.current.clientHeight)
  }
  function calcHeightExit(el) {
    const height = el.offsetHeight
    setMenuHeight(height * (products.length - 1) + cssRef.current.clientHeight)
  }

  useEffect(() => {
    setMenuHeight(ref.current.clientHeight)
  }, [])

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
    <div>
      <div className='products_page_Container'>
        <div className='title_button_products_admin'>
          <h1> Products : </h1>
          <div className='product_Btn'>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className='show_more_less_button'
              onClick={handleCreateProduct}>
              <AddIcon style={{ marginRight: '0.5rem' }} />
              New Product
            </button>
          </div>
        </div>
        <TableContainer
          style={{
            height: menuHeight,
            transition: 'height 500ms',
            margin: '1rem 0 2rem 0',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            overflow: 'hidden',
          }}
          component={Paper}
          className='large_table_products'>
          <Table ref={ref} aria-label='simple table'>
            <TableHead ref={cssRef}>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell align='center'>Product Image</TableCell>
                <TableCell align='center'>Product Name</TableCell>
                <TableCell align='center'>Price</TableCell>
                <TableCell align='center'>Brand</TableCell>
                <TableCell align='center'>Edit / Delete</TableCell>
              </TableRow>
            </TableHead>
            <TransitionGroup component={TableBody}>
              {products &&
                products.map((product) => (
                  <CSSTransition
                    key={product._id}
                    classNames='item-list'
                    timeout={500}
                    onEnter={calcHeightEnter}
                    onExit={calcHeightExit}>
                    <TableRow key={product._id}>
                      <TableCell component='th' scope='row'>
                        {product._id}
                      </TableCell>
                      <TableCell align='center'>
                        <Link to={`/order/${product._id}`}>
                          <img
                            className='image_table_products'
                            src={product.image}
                            alt={product.name}
                          />
                        </Link>
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
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </Table>
        </TableContainer>
        <TableContainer className='small_table_products' component={Paper}>
          <TransitionGroup component={Table}>
            {products &&
              products.map((product) => (
                <CSSTransition
                  key={product._id}
                  classNames='item-list'
                  timeout={500}>
                  <TableBody>
                    <TableRow>
                      <TableCell variant='head'>Product ID</TableCell>
                      <TableCell>{product._id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant='head'>Product Image</TableCell>
                      <TableCell>
                        <Link to={`/order/${product._id}`}>
                          <img
                            className='image_table_products'
                            src={product.image}
                            alt={product.name}
                          />
                        </Link>
                      </TableCell>
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
                </CSSTransition>
              ))}
          </TransitionGroup>
        </TableContainer>

        <Paginate isAdmin={true} pages={pages} page={page} />
      </div>
    </div>
  )
}

export default AdminProductsScreen
