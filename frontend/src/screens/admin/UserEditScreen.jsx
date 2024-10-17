import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import Message from "../../components/Message.jsx"
import Loader from "../../components/Loader.jsx"
import FormContainer from "../../components/FormContainer.jsx"
import { toast } from "react-toastify"
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/usersApiSlice.js"

const UserEditScreen = () => {
    const { id: userId } = useParams();
    console.log('userId', userId)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    
    const { data: user, refetch, isLoading, error } = useGetUserDetailsQuery(userId);
    
    const navigate = useNavigate();
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    useEffect(()=> {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin)
        }
    }, [user])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, isAdmin});
            toast.success('User updated successfully')
            refetch();
            navigate('/admin/userlist')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  return (
    <>
        <Link to='/admin/userlist' className="btn btn-light my-3">
            Go back
        </Link>
       {isLoading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) : (
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="my-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="isadmin" className="my-3">
                    <Form.Check
                        type="checkbox"
                        label="Is Admin"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    ></Form.Check>
                </Form.Group>

                <Button type="submit" variant="primary" className="my-2 text-black border-dark-subtle btn-hover btn-light">Update</Button>
            </Form>
        </FormContainer>
       )}
        
        
    </>
  )
}

export default UserEditScreen