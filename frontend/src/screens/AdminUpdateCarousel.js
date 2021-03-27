import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateItemCarousel,
  getOneItemCarousel,
} from '../actions/carouselActions'
import { UPDATE_ITEM_CAROUSEL_RESET } from '../constants/carouselConstants'
import { Input, FormControl, InputLabel } from '@material-ui/core'
import './styles/adminUpdateProduct.css'

const AdminUpdateProduct = ({ match, history }) => {
  const carouselItemId = match.params.id

  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const getOneItemCarouselValues = useSelector(
    (state) => state.getOneItemCarousel
  )
  const { carouselItem } = getOneItemCarouselValues

  const updateItemCarouselValues = useSelector(
    (state) => state.updateItemCarousel
  )
  const { success: successUpdate } = updateItemCarouselValues

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: UPDATE_ITEM_CAROUSEL_RESET })
    dispatch(getOneItemCarousel(carouselItemId))
  }, [])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (successUpdate) {
      history.push('/admin/carousel')
    }
    if (carouselItem) {
      setTitle(carouselItem.title)
      setImage(carouselItem.image)
      setCategory(carouselItem.category)
    }
  }, [dispatch, history, successUpdate, carouselItem])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      updateItemCarousel(carouselItemId, {
        title,
        image,
        category,
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

      const { data } = await axios.post(
        '/api/upload/carousel',
        formData,
        config
      )
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
            <InputLabel htmlFor='my-input'>Title</InputLabel>
            <Input
              type='text'
              value={title}
              fullWidth={true}
              onChange={(e) => setTitle(e.target.value)}
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
            className='custom-file-input'
          />

          {uploading && <div>Uploading ...</div>}
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

        <button className='show_more_less_button' type='submit'>
          UPDATE
        </button>
      </form>
    </div>
  )
}

export default AdminUpdateProduct
