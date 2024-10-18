import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-4 p-3 rounded'>
        <Link to={`/product/${product._id}`} >
            <Card.Img variant="top" className='img-custom img-hover' src={product.image} />
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`} className='text-decoration-none custom-text opacity-75 '>
                <Card.Title as="div" className='product-title'>
                    <strong className='text-hover-product'>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="div">
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </Card.Text>

            <Card.Text className="py-1 fw-normal" as="h5">${product.price}</Card.Text>
        </Card.Body>
    </Card>
   
)
}

export default Product