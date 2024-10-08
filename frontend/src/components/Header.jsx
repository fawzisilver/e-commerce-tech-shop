import { Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer} from 'react-router-bootstrap'
import logo from '../assets/logo.png'
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
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>
                    <img src={logo} alt="logo"/>
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
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                 </LinkContainer>
                                 <NavDropdown.Item onClick={logoutHandler}>
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

                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header