import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const loggedInMenu = (
    <NavDropdown title={userInfo?.name} id='username'>
      <NavDropdown.Item as={Link} to='/profile'>
        Profile
      </NavDropdown.Item>
      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
    </NavDropdown>
  );

  const signInButton = (
    <Nav.Link as={Link} to='/login'>
      <i className='fas fa-user'></i> Sign In
    </Nav.Link>
  );

  return (
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
            {userInfo ? loggedInMenu : signInButton}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <NavDropdown.Item as={Link} to='/admin/userlist'>
                  Users
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/admin/productlist'>
                  Products
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/admin/orderlist'>
                  Orders
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
