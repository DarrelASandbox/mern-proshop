import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components/';
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  OrderListScreen,
  OrderScreen,
  PaymentScreen,
  PlaceOrderScreen,
  ProductEditScreen,
  ProductListScreen,
  ProductScreen,
  ProfileScreen,
  RegisterScreen,
  ShippingScreen,
  UserEditScreen,
  UserListScreen,
} from './screens/';

const App = () => (
  <>
    <BrowserRouter>
      <Header />
      <Container>
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomeScreen />}
            />
            <Route path='/page/:pageNumber' element={<HomeScreen />} />

            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />

            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart/' element={<CartScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:orderId' element={<OrderScreen />} />

            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route
              path='/admin/user/:userId/edit'
              element={<UserEditScreen />}
            />
            <Route path='/admin/productlist' element={<ProductListScreen />} />
            <Route
              path='/admin/product/:productId/edit'
              element={<ProductEditScreen />}
            />
            <Route
              path='/admin/productlist/:pageNumber'
              element={<ProductListScreen />}
            />

            <Route path='/admin/orderlist' element={<OrderListScreen />} />
          </Routes>
        </main>
      </Container>
      <Footer />
    </BrowserRouter>
  </>
);

export default App;
