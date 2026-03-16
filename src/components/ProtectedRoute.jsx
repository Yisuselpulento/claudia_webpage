import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {

  const { admin, loading } = useAuth()

  if (loading) return null

  if (!admin) {
    return <Navigate to="/admin" replace />
  }

  return children
}

export default ProtectedRoute