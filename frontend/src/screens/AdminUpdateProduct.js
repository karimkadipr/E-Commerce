import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetails } from '../actions/productActions'
import {
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
} from '../constants/productConstants'
import { Input, FormControl, InputLabel } from '@material-ui/core'
import './styles/adminUpdateProduct.css'

const AdminUpdateProduct = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const getProductDetail = useSelector((state) => state.getProductDetail)
  const { product, success: getProductDetailSuccess } = getProductDetail

  const updateProductValues = useSelector((state) => state.updateProduct)
  const { success: successUpdate } = updateProductValues

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_PRODUCT_RESET })
      dispatch({ type: CREATE_PRODUCT_RESET })
      history.push('/admin/products')
    } else {
      if (!getProductDetailSuccess || product._id !== productId) {
        dispatch(getProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [
    dispatch,
    history,
    product,
    productId,
    successUpdate,
    getProductDetailSuccess,
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct(match.params.id, {
        name,
        price,
        user: userInfo.id,
        image,
        brand,
        category,
        countInStock,
        description,
        uploading,
      })
    )
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  return (
    <div className='update_product_container'>
      <form className='form_profile_container' onSubmit={handleSubmit}>
        <div className='input_update_product_container'>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor='my-input'>Name</InputLabel>
            <Input
              type='text'
              value={name}
              fullWidth={true}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </div>
        <div className='input_update_product_container'>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor='my-input'>Price</InputLabel>
            <Input
              type='text'
              value={price}
              fullWidth={true}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
        </div>
        <div className='input_update_product_container'>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor='my-input'>Image URL</InputLabel>
            <Input
              type='text'
              value={image}
              fullWidth={true}
              onChange={(e) => setImage(e.target.value)}
            />
          </FormControl>

          <input
            type='file'
            id='img'
            name='img'
            onChange={uploadFileHandler}
            className='upload_button_product_img'
          />

          {uploading && <div>Uploading ...</div>}
        </div>
        <div className='input_update_product_container'>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor='my-input'>Brand</InputLabel>
            <Input
              type='text'
              value={brand}
              fullWidth={true}
              onChange={(e) => setBrand(e.target.value)}
            />
          </FormControl>
        </div>
        <div className='input_update_product_container'>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor='my-input'>Category</InputLabel>
            <Input
              type='text'
              value={category}
              fullWidth={true}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormControl>
        </div>
        <div className='input_update_product_container'>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor='my-input'>Quantity</InputLabel>
            <Input
              type='text'
              value={countInStock}
              fullWidth={true}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </FormControl>
        </div>
        <div className='input_update_product_container'>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor='my-input'>Description</InputLabel>
            <Input
              type='text'
              value={description}
              fullWidth={true}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </div>

        <button className='submit_update_product_button' type='submit'>
          UPDATE
        </button>
      </form>
    </div>
  )
}

export default AdminUpdateProduct
