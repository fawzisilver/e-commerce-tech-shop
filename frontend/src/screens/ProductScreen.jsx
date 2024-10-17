import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice.js';
import { addToCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap'
import Message from '../components/Message';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
// import products from '../products'
// import axios from 'axios'

const ProductScreen = () => {
    const { id: productId } = useParams();
    const { data: product, refetch, isLoading, error } = useGetProductDetailsQuery(productId);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    
    // redux toolkit query (instead of axios)

    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth); //global state (redux)

    //addToCart of cartSlice
    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty }));  //do action (to cartSlice)
        navigate('/cart') //go here
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId,
                rating,
                comment
            }).unwrap();

            refetch();
            toast.success('Review submitted');
            setRating(0);
            setComment('');
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
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
            <>
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
                                 className='btn-hover btn-light text-black border-dark-subtle'
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
         <Row className='review'>
                        <Col md={6}>
                            <h2>Reviews</h2>
                                {product.reviews.length === 0 && (<Message>No reviews</Message>)}
                                    <ListGroup variant='flush'>
                                        {product.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} />
                                                <p>{review.createdAt.substring(0,10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}
                                        <ListGroup.Item>
                                            <h2>Write a Customer Review</h2>
                                            {loadingProductReview && <Loader />}

                                            { userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating' className='my-2'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment' className='my-2'>
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='3'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                        <Button
                                                        className='btn-light text-black border-dark-subtle'
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'>Submit</Button>

                                                    </Form.Group>
                                                </Form>
                                            ) : (<Message>Please <strong><Link to="/login"  className="custom-link custom-link-hover">sign in</Link></strong> to write a review</Message>)}
                                        </ListGroup.Item>
                                    </ListGroup>
                        </Col>
         </Row>
         </>
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