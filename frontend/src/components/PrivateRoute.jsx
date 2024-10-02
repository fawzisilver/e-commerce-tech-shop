import { Outlet, Navigate } from 'react-router-dom' //return Outlet if logged in (means e.g. access to /shipping
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    // if userInfo exist (meaning logged then ..)
    // will render <ShippingScreen /> instead of outlet or other child elements or path
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute