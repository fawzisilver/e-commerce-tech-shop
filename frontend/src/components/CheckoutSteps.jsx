import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// step1-4 is true or false
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            { step1 ? (
                <LinkContainer to="/login" className="custom-link checkout-hover">
                    <Nav.Link>Sign in</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Sign in</Nav.Link>
            ) }
        </Nav.Item>
        <Nav.Item>
            { step2 ? (
                <LinkContainer to="/shipping" className="custom-link checkout-hover">
                    <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Shipping</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            { step3 ? (
                <LinkContainer to="/payment" className="custom-link checkout-hover">
                    <Nav.Link>Payment</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Payment</Nav.Link>
            ) }
        </Nav.Item>
        <Nav.Item>
            { step4 ? (
                <LinkContainer to="/placeOrder" className="custom-link checkout-hover">
                    <Nav.Link>Place Order</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Place Order</Nav.Link>
            ) }
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps