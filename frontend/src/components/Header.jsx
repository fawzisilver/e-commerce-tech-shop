import { Badge, Navbar, Nav, Container} from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer} from 'react-router-bootstrap'
import logo from '../assets/logo.png'
import { useSelector } from 'react-redux' //select global state


const Header = () => {
    const { cartItems} = useSelector((state) => state.cart) //state.cart from store.cart property
    console.log(cartItems)

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
                        <LinkContainer to="/login">
                            <Nav.Link >
                                <FaUser /> Sign in
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header