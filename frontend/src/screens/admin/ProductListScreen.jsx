import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from 'react-bootstrap'
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetProductsQuery, useCreateProductMutation } from "../../slices/productsApiSlice.js"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'

const ProductListScreen = () => {
    const { data: products, refetch, isLoading, error } = useGetProductsQuery();

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct();
                refetch();
                toast.success('You created new product')
            } catch(err) {
                toast.error(err?.data?.message || err.error)
            }
        } 
    }

    const deleteHandler = (id) => {
        console.log(id)
    }
    console.log('checking products for productlistscreen', products)

  return (
    <>
        <Row className="align-items-center">
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className="text-end">
                <Button onClick={createProductHandler} className="btn-sm m-3"><FaEdit /> Create Product</Button>
            </Col>
        </Row>

        { loadingCreate && <Loader />}
        {isLoading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <>
                <Table striped hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>$ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                
                                <td>
                                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                        <Button variant='light' className="btn-sm mx-2"><FaEdit /></Button>
                                    </LinkContainer>
                                    <Button onClick={() => deleteHandler(product._id)} variant="danger" className="btn-sm">
                                        <FaTrash style={{ color: 'white'}} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>   
            </>
        )}
    </>
  )
}

export default ProductListScreen
