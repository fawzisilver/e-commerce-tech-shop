import { useParams } from 'react-router-dom'
// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { Spinner } from 'react-bootstrap'
import Message from '../components/Message';
// import products from '../products'
// import axios from 'axios'

const ProductScreen = () => {
    const { id: productId } = useParams();

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

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
             <Row>
             <Col md={5}>
                 <Image src={product.image} alt={product.name} fluid />
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
                         Price: ${product.price}
                     </ListGroup.Item>
 
                     <ListGroup.Item>
                         Description: {product.description}
                     </ListGroup.Item>
                 </ListGroup>
             </Col>
             <Col md={3}>
                 <Card>
                     <ListGroup variant="flush">
                         <ListGroup.Item>
                             <Row>
                                 <Col>Price:</Col>
                                 <Col>
                                     <strong>${product.price}</strong>
                                 </Col>
                             </Row>
                         </ListGroup.Item>
 
                         <ListGroup.Item>
                             <Row>
                                 <Col>Status:</Col>
                                 <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                             </Row>
                         </ListGroup.Item>
 
                         <ListGroupItem>
                             <Button
                                 className='btn-block'
                                 type='button'
                                 disabled={product.countInStock === 0}    
                             >
                                 Add To Cart
                             </Button>
                         </ListGroupItem>
 
                         
                     </ListGroup>
                 </Card>
             </Col>
 
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