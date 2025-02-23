import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card, } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../slices/cartSlice'

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    //current previous product and qty we wanna add
    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({...product, qty}))
    }

    //id params is the action.payload in cartSlice
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        navigate('/login?redirect=/shipping')
    }

    console.log(cartItems)
    console.log(`Checking for itemsPrice ${cart.itemsPrice}`)
  return (
    <Row>
        <Col md={8}>
            <h1 style={{marginBottom: '20px'}}>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message>
                    Your cart is empty <Link to="/" className="custom-link custom-link-hover">Go back</Link>
                </Message>
            ) : (
                <ListGroup variant='flush' className='item-rounded shadow'>
                    {cartItems.map((item) => (
                        <ListGroup.Item key={item._id} >
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item._id}`} className="custom-link custom-link-hover">{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2}>
                                    <Form.Control
                                        as='select'
                                        value={item.qty}    
                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                        <Button type='button' variant='light' onClick={ () => removeFromCartHandler(item._id)}>
                                            <FaTrash />
                                        </Button>
                                </Col>
                            </Row>

                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                        </h2>
                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button disabled={cartItems.length === 0} onClick={checkOutHandler} className='btn-hover bg-white text-black border-dark-subtle'>
                            Proceed to Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
)
}

export default CartScreen


