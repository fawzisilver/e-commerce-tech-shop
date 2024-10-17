import { Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer} from 'react-router-bootstrap'
// import logo from '../assets/logo.png'
import logo from '../assets/techshop.png'
import { useSelector } from 'react-redux' //select global state from redux store
import { useNavigate } from 'react-router-dom'
import { useDispatch  } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice.js'
import { logout } from '../slices/authSlice.js'


const Header = () => {
    const { cartItems } = useSelector((state) => state.cart); //state.cart from store.cart property
    const { userInfo } = useSelector((state) => state.auth); // userInfo is from redux state!

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [logoutApiCall] = useLogoutMutation();
    const [logoutApiCall] = useLogoutMutation();


    const logoutHandler = async () => {
        try {
;           await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
        console.log('logged out');
        
    }

  return (
    <header> 
        {/* bg="dark" */}
        <Navbar  className='custom-navbar' variant="dark" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>
                    <img src={logo} alt="logo" style={{ height: '50px', width: '50px' }}/>
                    Tech Shop
                 </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <FaShoppingCart /> Cart
                                {
                                    cartItems.length > 0 && (
                                        <Badge pill bg="success" style={{marginLeft: '5px`'}}>
                                            {cartItems.reduce((acc, current) => acc + current.qty, 0)}
                                        </Badge>
                                    )
                                }
                            </Nav.Link>
                        </LinkContainer>
                        {/* if logged in, then show profile instead of sign in*/}
                        {userInfo ? 
                        (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item className='bg-white text-black border-dark-subtle btn-hover'>
                                        Profile
                                    </NavDropdown.Item>
                                 </LinkContainer>
                                 <NavDropdown.Item onClick={logoutHandler} className='bg-white text-black border-dark-subtle btn-hover'>
                                    Logout
                                 </NavDropdown.Item>
                            </NavDropdown>) 
                        
                        : 
                        (
                        <LinkContainer to="/login">
                            <Nav.Link >
                                <FaUser /> Sign in
                            </Nav.Link>
                        </LinkContainer>
                    )}

                    { userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Admin">
                            <LinkContainer to="/admin/orderlist" className='bg-white text-black border-dark-subtle btn-hover'>
                                <NavDropdown.Item>
                                   Orders
                                </NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to='/admin/productlist' className='bg-white text-black border-dark-subtle btn-hover'>
                                <NavDropdown.Item>
                                    Products
                                </NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to='/admin/userlist' className='bg-white text-black border-dark-subtle btn-hover'>
                                <NavDropdown.Item>
                                    Users
                                </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header