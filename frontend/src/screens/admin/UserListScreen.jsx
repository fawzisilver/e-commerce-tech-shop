
import { useSelector, useDispatch } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from 'react-bootstrap'
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice.js"
import { toast } from "react-toastify"


const UserListScreen = () => {
    const {data: users, refetch, isLoading, error } = useGetUsersQuery();
    console.log('is there users?', users)

    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

    const deleteHandler = async (id) => {
        if (window.confirm('Delete user?')) {
            try {
                await deleteUser(id);
                refetch();
                toast.success('User deleted :)')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
  return (
    <>
        <h1>Users</h1>
        {isLoading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) : (
            <Table striped responsive hover className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIl</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`} className="custom-link-italic custom-link-hover">{user.email}</a></td>
                            <td>{user.isAdmin ? (
                                <FaCheck style={{ color: 'green' }}/>
                            ) : (
                                <FaTimes style={{ color: 'red' }}/>
                            ) }</td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant="light" className="btn-sm">
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant="danger"
                                    className="btn-sm"
                                    onClick={(e) => deleteHandler(user._id)}
                                >
                                    <FaTrash style={{ color: 'white'}}/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </Table>
        )}
    </>
  )
}

export default UserListScreen