import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message.jsx'
import Loader from '../components/Loader.jsx'
import { PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useDeliverOrderMutation } from '../slices/ordersApiSlice.js'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'



const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

    const [{ isPending}, paypalDispatch] = usePayPalScriptReducer();

    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector((state) => state.auth)

    // use paypal script
    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'CAD',
                    }
                })
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
            }
            if(order && !order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript();
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

    useEffect(() => {
        console.log('Order data after refetch', order)
    }, [order])


    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered')
        } catch(err) {
            toast.error(err?.data?.message || err.message)
        }
    }

    
    /** Test  */
//    async function onApproveTest() {
//     await payOrder({ orderId, details: { payer: {} }});
//     refetch();
//     toast.success('Payment successfully')
//    }
function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {    //details is from paypal
        try {
            await payOrder({orderId, details});
            refetch();
            toast.success('Payment successfully')
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    })   
}
    
    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    }
                }
            ]
        }).then((orderId) => {
            return orderId;
        })
    }

    function onError(err) {
        toast.error(err.message)
    }


    
  return (
    isLoading ? <Loader /> : error ? <Message variant="danger"/> : (
        <>
            <h1>Orders: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong> { order.user.email }
                            </p>
                            <p>
                                <strong>Address: </strong>
                                { order.shippingAddress.address}, { order.shippingAddress.city}, 
                                {' '}{order.shippingAddress.postalCode} {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant="danger">Not Delivered</Message>
                            ) }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            { order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                        ) : (
                                <Message variant="danger">Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                        {/* item.product (using the ref of product schema) */}
                                            <Link to={`/product/${item.product}`} className='custom-link custom-link-hover'>{item.name}</Link> 
                                        </Col>
                                        <Col md={4}>
                                        {item.qty} x {item.price} = $ {(item.qty * item.price).toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>$ {order.itemsPrice.toFixed(2)}</Col>
                                </Row>

                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                                </Row>

                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice.toFixed(2)}</Col>
                                </Row>

                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* PAY ORDER */}
                            { !order.isPaid && (
                                <ListGroup.Item>
                                    {isLoading && <Loader />}

                                    {isPending ? <Loader /> : (
                                        <div>
                                            {/* <Button onClick={onApproveTest} style={{marginBottom: '10px'}}>Test Pay Order</Button> */}
                                            <div>
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                ></PayPalButtons>
                                            </div>
                                        </div> 
                                    )} 
                                </ListGroup.Item>
                            )}
                            {/* MARK AS DELIVERED PLACEHOLDER*/}
                            {loadingDeliver && <Loader />}
                            {/**if authenticated, is an admin, paid the order, is not delivered yet then ... */}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                 <ListGroup.Item>
                                    <Button type='button' className='btn btn-block bg-white text-black border-dark-subtle btn-hover'
                                        onClick={deliverOrderHandler}>
                                            Mark as Delivered
                                        </Button>
                                 </ListGroup.Item>
                            )}


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
  )
    

}

export default OrderScreen