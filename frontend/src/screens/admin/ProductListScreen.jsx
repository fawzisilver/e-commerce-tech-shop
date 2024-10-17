import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from 'react-bootstrap'
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetProductsQuery,
     useCreateProductMutation,
    useDeleteProductMutation } from "../../slices/productsApiSlice.js"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { toast } from 'react-toastify'
import Paginate from "../../components/Paginate.jsx"

const ProductListScreen = () => {
    const { pageNumber } = useParams();
  const { data, refetch, isLoading, error } = useGetProductsQuery({ pageNumber });

  console.log('From ProductListScreen', data)

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

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

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted')
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

  return (
    <>
        <Row className="align-items-center">
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className="text-end">
                <Button onClick={createProductHandler} className="btn-sm m-3 bg-white text-black border-dark-subtle btn-hover"><FaEdit /> Create Product</Button>
            </Col>
        </Row>

        { loadingCreate && <Loader />}
        { loadingDelete && <Loader />}
        {isLoading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <>
                <Table striped hover responsive className="table-md">
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
                        {data.products.map((product) => (
                            <tr key={product._id} className="fs-6">
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
                <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
            </>
        )}
    </>
  )
}

export default ProductListScreen

