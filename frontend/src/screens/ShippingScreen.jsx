import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux' //access reducer (actions), global state of redux
import { useNavigate } from 'react-router-dom' // navigate to different routes 
import { saveShippingAddress } from '../slices/cartSlice.js'
import CheckoutSteps from '../components/CheckoutSteps.jsx'

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart); //retrieve state from cart slice with properies (cartItems, shippingAddress, and payment method)
    const { shippingAddress } = cart; //destructuring ONLY the shippingAddress property state  from cartSlice

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');   
    }
  return (
    <FormContainer>
        <h1>Shipping</h1>
            {/* equivalent to <CheckoutSteps step1={true} step2={true} etc.. */}
            {/* only step 1 and 2 are true on this screen */}
            <CheckoutSteps step1 step2 />

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address' className='my-2'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Enter address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city' className='my-2'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Enter city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode' className='my-2'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Enter postal code'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Enter country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2 bg-white text-black border-dark-subtle btn-hover'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen