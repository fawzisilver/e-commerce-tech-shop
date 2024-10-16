import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice.js'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
// import products from '../products'
// import axios from 'axios'
// import { useEffect, useState } from 'react';

const HomeScreen = () => {
  // redux toolkit (instead of fetching through axios)
  const { data: products, isLoading, error } = useGetProductsQuery();

//ternary op
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
        <>
        <h1 className='custom-text mb-3 fw-light'>Latest Products</h1>
        <Row>
            {products.map((product)=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen



  // const [products, setProducts] = useState([]);
 
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const { data } = await axios.get('http://localhost:5000/api/products');
  //       setProducts(data);
  //     } catch(error) {
  //       throw new Error('Error fetching data: ', error);
  //     }
  //   }

  //   fetchProducts();
  // }, [])
  
 

