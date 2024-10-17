import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../slices/productsApiSlice.js'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import Paginate from '../components/Paginate.jsx'
// import products from '../products'
// import axios from 'axios'
// import { useEffect, useState } from 'react';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams(); //path parameter (not query parameter unlike the getProducts backend [it is query param])

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });
  console.log('From HomeScreen', data)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
        <>
        <h1 className='custom-text mb-3 fw-light'>Latest Products</h1>
        <Row>
          {/* from res.json({ products, page, pages }) (backend)*/}
            {data.products.map((product)=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}/>
        </>
      )}
    </>
  )
}

export default HomeScreen


  
 

