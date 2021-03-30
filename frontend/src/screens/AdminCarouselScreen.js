import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addItemCarousel,
  getItemCarousel,
  deleteItemCarousel,
} from '../actions/carouselActions'
import './styles/adminProductsScreen.css'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import { UPDATE_ITEM_CAROUSEL_RESET } from '../constants/carouselConstants'
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
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getItemCarouselValue = useSelector((state) => state.getItemCarousel)
  const { carouselItems } = getItemCarouselValue

  const deleteItemCarouselValues = useSelector(
    (state) => state.deleteItemCarousel
  )
  const { success: successDelete } = deleteItemCarouselValues

  const addItemCarouselValues = useSelector((state) => state.addItemCarousel)
  const { success: successAdd } = addItemCarouselValues

  const updateItemCarouselValues = useSelector(
    (state) => state.updateItemCarousel
  )
  const { success: successUpdate } = updateItemCarouselValues

  useEffect(() => {
    /* dispatch({ type: UPDATE_ITEM_CAROUSEL_RESET }) */
    if (userInfo && !userInfo.isAdmin) {
      history.push('/')
    }
    if (!userInfo) {
      history.push('/')
    }
    if (
      (carouselItems && carouselItems.length === 0) ||
      successAdd ||
      successDelete ||
      successUpdate
    ) {
      dispatch(getItemCarousel())
      dispatch({ type: UPDATE_ITEM_CAROUSEL_RESET })
    }
  }, [dispatch, history, userInfo, successAdd, successDelete, successUpdate])

  const handleDelete = (id) => {
    dispatch(deleteItemCarousel(id))
  }

  const handleCreateCarouselItem = () => {
    dispatch(addItemCarousel())
  }

  const handleEditCarouselItem = (id) => {
    history.push(`/admin/editcarousel/${id}`)
  }

  function calcHeightEnter(el) {
    const height = el.offsetHeight
    setMenuHeight(ref.current.clientHeight)
  }
  function calcHeightExit(el) {
    const height = el.offsetHeight
    setMenuHeight(ref.current.clientHeight)
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
  console.log(menuHeight)
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
              onClick={handleCreateCarouselItem}>
              <AddIcon style={{ marginRight: '0.5rem' }} />
              New Carousel Item
            </button>
          </div>
        </div>
        <TableContainer
          component={Paper}
          className='large_table_products'
          style={{
            height: menuHeight,
            transition: ' height 500ms ',
            margin: '1rem 0 2rem 0',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            overflow: 'hidden',
          }}>
          <Table ref={ref} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Carousel ID</TableCell>
                <TableCell align='center'>Carousel Image</TableCell>
                <TableCell align='center'>Carousel Title</TableCell>
                <TableCell align='center'>Carousel Category</TableCell>
                <TableCell align='center'>Edit / Delete</TableCell>
              </TableRow>
            </TableHead>
            <TransitionGroup component={TableBody}>
              {carouselItems &&
                carouselItems.map((product) => (
                  <CSSTransition
                    key={product._id}
                    classNames='item-list'
                    timeout={500}
                    onEnter={calcHeightEnter}
                    onExit={calcHeightExit}>
                    <TableRow ref={cssRef}>
                      <TableCell component='th' scope='row'>
                        {product._id}
                      </TableCell>
                      <TableCell align='center'>
                        <img
                          className='image_table_products'
                          src={product.image}
                          alt={product.title}
                        />
                      </TableCell>
                      <TableCell align='center'>{product.category}</TableCell>
                      <TableCell align='center'>{product.title}</TableCell>

                      <TableCell align='center'>
                        <button
                          className='admin_products_edit_btn'
                          onClick={() => handleEditCarouselItem(product._id)}>
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
        {carouselItems &&
          carouselItems.map((product) => (
            <TableContainer
              className='small_table_products'
              key={product._id}
              component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell variant='head'>Carousel ID</TableCell>
                    <TableCell>{product._id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Carousel Image</TableCell>
                    <TableCell>
                      <img
                        className='image_table_products'
                        src={product.image}
                        alt={product.title}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell variant='head'>Carousel Title</TableCell>
                    <TableCell>{product.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Carousel Category</TableCell>
                    <TableCell>{product.category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Edit / Delete</TableCell>
                    <TableCell>
                      <button
                        className='admin_products_edit_btn'
                        onClick={() => handleEditCarouselItem(product._id)}>
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
      </div>
    </div>
  )
}

export default AdminProductsScreen
