import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"; //dispatch action and access global state like user
import Loader from "../components/Loader"; //when its loading
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from "../slices/usersApiSlice.js"; //for apis (post method)
import { setCredentials } from "../slices/authSlice.js"; //a action creator from reducer
import { toast } from 'react-toastify'

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation(); //isLoading and error is created by useLoginMutation

    const { userInfo } = useSelector((state) => state.auth) //auth is the slice (has all info)

    const { search } = useLocation();
    const sp = new URLSearchParams(search); //sp is search params
    const redirect = sp.get('redirect') || '/'; //(redirected to other page) if "redirect" in url e.g. (/login?redirect=/shipping) or homepage

    useEffect(() => {

        console.log(userInfo);
        
        //if userInfo in localstorage
        if(userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate])

    //we login by calling Login from createSlice and setCredentials action creator
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            //login is from usestate (useLoginMutation)
            const res = await login({ email, password }).unwrap(); //unwrap, unwraps the resolved promised value
            dispatch(setCredentials({...res })) //sets to the localstorage based on user input (check this slice)
            navigate(redirect)
        } catch(err) {
            toast.error(err?.data?.message || err.error) //? is to properly deal with undefined or null
        }
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId="email" className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type="submit" variant='primary' className="mt-2" disabled={isLoading}>
                Sign In
            </Button>

            { isLoading && <Loader /> }
        </Form>

            <Row className="py-3">
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>

    </FormContainer>
        )
}

export default LoginScreen