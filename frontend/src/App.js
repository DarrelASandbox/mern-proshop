import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components/';
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  ProductScreen,
  RegisterScreen,
} from './screens/';

const App = () => (
  <>
    <BrowserRouter>
      <Header />
      <Container>
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart/' element={<CartScreen />} />
          </Routes>
        </main>
      </Container>
      <Footer />
    </BrowserRouter>
  </>
);

export default App;
