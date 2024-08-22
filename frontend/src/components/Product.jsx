import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Product = ({ product }) => {
  return (
    <Card className='my-4 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <Card.Img variant="top" src={product.image}/>
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text className="py-1" as="h4">${product.price}</Card.Text>
        </Card.Body>
    </Card>
   
)
}

export default Product