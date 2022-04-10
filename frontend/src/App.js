import { Container } from 'react-bootstrap';
import { Footer, Header } from './component/';
import { HomeScreen, ProductScreen } from './screens/';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
  <>
    <BrowserRouter>
      <Header />
      <Container>
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
          </Routes>
        </main>
      </Container>
      <Footer />
    </BrowserRouter>
  </>
);

export default App;
