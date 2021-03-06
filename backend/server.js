import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import carouselRoutes from './routes/carouselRoutes.js'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorHandling.js'
import uploadRoutes from './routes/uploadRoutes.js'
import uploadRoutesCarousel from './routes/uploadRoutesCarousel.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/carousel', carouselRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/upload/carousel', uploadRoutesCarousel)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('the server has started')
})
