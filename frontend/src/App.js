import { Container } from 'react-bootstrap';
import { Footer, Header } from './component/';

const App = () => (
  <>
    <Header />
    <main className='py-3'>
      <Container>
        <h1>Welcome to ProShop</h1>
      </Container>
    </main>
    <Footer />
  </>
);

export default App;
