import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => (
  <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
    <Container>
      <Navbar.Brand as={Link} to='/'>
        ProShop
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ms-auto'>
          <Nav.Link as={Link} to='/cart'>
            <i className='fas fa-shopping-cart'></i> Cart
          </Nav.Link>
          <Nav.Link as={Link} to='/login'>
            <i className='fas fa-user'></i> Sign In
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;