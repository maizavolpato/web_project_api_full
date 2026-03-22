import { Navigate } from 'react-router-dom'

export function ProtectedRoute( { isLoggedIn, children }){
    if (!isLoggedIn){
        return <Navigate to="/signin" />
    }
    return children
}

export default ProtectedRoute