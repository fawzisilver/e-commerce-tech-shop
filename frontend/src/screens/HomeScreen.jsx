import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
// import products from '../products'
import axios from 'axios'
import { useEffect, useState } from 'react';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        // Parse the JSON data
        const data = await response.json();
        
        // Update the products state
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);
  
  
  


  return (
    <>
        <h1>Latest Products</h1>
        <Row>
            {products.map((product)=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen




 

