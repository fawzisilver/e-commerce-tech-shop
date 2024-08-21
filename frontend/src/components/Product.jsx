import { Card } from 'react-bootstrap'


const Product = ({ product }) => {
  return (
    <Card className='my-4 p-3 rounded'>
        <a href={`/product/${product._id}`}>
            <Card.Img variant="top" src={product.image}/>
        </a>

        <Card.Body>
            <a href={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </a>
            <Card.Text className="py-1" as="h4">${product.price}</Card.Text>
        </Card.Body>
    </Card>
   
)
}

export default Product