import './App.css'
import HomePage from './screens/HomePage'
import HomePageWithoutCarousel from './screens/HomePageWithoutCarousel'
import ProductDetail from './screens/ProductDetail'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import Header from './components/Header'
import CartPage from './screens/CartPage'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserDetails from './screens/UserDetails'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import OrderScreen from './screens/OrderScreen'
import OrderDetails from './screens/OrderDetails'
import AdminUsersScreen from './screens/AdminUsersScreen'
import AdminUserDetails from './screens/AdminUserDetails'
import AdminProductsScreen from './screens/AdminProductsScreen'
import AdminUpdateProduct from './screens/AdminUpdateProduct'
import AdminOrdersScreen from './screens/AdminOrdersScreen'
import AdminCarouselScreen from './screens/AdminCarouselScreen'
import AdminUpdateCarousel from './screens/AdminUpdateCarousel'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollOnTop'

function App() {
  return (
    <div className='body'>
      <div className='content'>
        <Router>
          <LastLocationProvider>
            <ScrollToTop />
            <Route path='/' component={Header} />
            <div className='body_content_padding_top'>
              <Route path='/' component={HomePage} exact />
              <Route
                path='/search/:keyword'
                component={HomePageWithoutCarousel}
                exact
              />
              <Route
                path='/page/:pageNumber'
                component={HomePageWithoutCarousel}
                exact
              />
              <Route
                path='/search/:keyword/page/:pageNumber'
                component={HomePageWithoutCarousel}
                exact
              />
              <Route path='/order/:id' component={ProductDetail} exact />
              <Route path='/cart' component={CartPage} exact />
              <Route path='/login' component={LoginScreen} exact />
              <Route path='/signup' component={SignUpScreen} exact />
              <Route path='/profile' component={ProfileScreen} exact />
              <Route path='/details' component={UserDetails} exact />
              <Route path='/shipping' component={ShippingScreen} exact />
              <Route path='/payment' component={PaymentScreen} exact />
              <Route path='/order' component={OrderScreen} exact />
              <Route path='/orderDetails/:id' component={OrderDetails} exact />
              <Route path='/admin/users' component={AdminUsersScreen} exact />
              <Route
                path='/admin/users/:id'
                component={AdminUserDetails}
                exact
              />
              <Route
                path='/admin/products'
                component={AdminProductsScreen}
                exact
              />
              <Route
                path='/admin/carousel'
                component={AdminCarouselScreen}
                exact
              />
              <Route
                path='/admin/products/:pageNumber'
                component={AdminProductsScreen}
                exact
              />
              <Route path='/admin/orders' component={AdminOrdersScreen} exact />
              <Route
                path='/admin/editcarousel/:id'
                component={AdminUpdateCarousel}
                exact
              />
              <Route
                path='/admin/products/editproduct/:id'
                component={AdminUpdateProduct}
                exact
              />
            </div>
          </LastLocationProvider>
        </Router>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  )
}

export default App
