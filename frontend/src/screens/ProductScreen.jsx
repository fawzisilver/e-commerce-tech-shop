import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap'
import Message from '../components/Message';
// import products from '../products'
// import axios from 'axios'

const ProductScreen = () => {

    const [qty, setQty] = useState(1);

    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    // redux toolkit query (instead of axios)
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    //addToCart of cartSlice
    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty }));  //do action (to cartSlice)
        navigate('/cart') //go here
    }


  return (
    <>
        <Link className='btn btn-light my-3' to="/">
            Go Back
        </Link>

        { isLoading ? (
            <Spinner />
        ) : error ? (
            <Message variant='danger'>{error?.data.message || error.error}</Message>
        ) : (
             <Row className='mt-3'>
             <Col md={5}>
                 <Image src={product.image} alt={product.name} className='image-hover'fluid rounded/>
             </Col>
             <Col md={4}>
                 <ListGroup variant='flush'>
 
                     <ListGroup.Item>
                         <h3>{product.name}</h3>
                     </ListGroup.Item>
 
                     <ListGroup.Item>
                         <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                     </ListGroup.Item>
 
                     <ListGroup.Item>
                         <span className='fw-semibold'>Price:</span> ${product.price}
                     </ListGroup.Item>
 
                     <ListGroup.Item>
                         <span className='fw-semibold'>Description:</span> <span className='fw-light'>{product.description}</span>
                     </ListGroup.Item>
                 </ListGroup>
             </Col>
             <Col md={3}>
                 <Card>
                     <ListGroup variant="flush">
                         <ListGroup.Item>
                             <Row>
                                 <Col className='fw-semibold'>Price:</Col>
                                 <Col>
                                     <strong>${product.price}</strong>
                                 </Col>
                             </Row>
                         </ListGroup.Item>
 
                         <ListGroup.Item>
                             <Row>
                                 <Col className='fw-semibold'>Status:</Col>
                                 <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                             </Row>
                         </ListGroup.Item>
 
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col className='fw-semibold'>Qty</Col>
                                    <Col>
                                        <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                        )}

                         <ListGroup.Item>
                             <Button 
                                 className='btn-hover bg-white text-black border-dark-subtle'
                                 type='button'
                                 disabled={product.countInStock === 0}    
                                 onClick={addToCartHandler}
                             >
                                 Add To Cart
                             </Button>
                         </ListGroup.Item>
 
                         
                     </ListGroup>
                 </Card>
             </Col>
            <hr className='mt-3'/>
         </Row>
        ) }
       
    </>
  )
}

export default ProductScreen


// const [product, setProduct] = useState({});


// useEffect(() => {
//     const fetchProducts = async () => {
//         try {
//             const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
//             setProduct(data);
//         } catch (error) {
//             throw new Error('Error fetching data', error)
//         }
    
//     }

//   fetchProducts();
// }, [productId])