import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PublicRoute = ({ children }) => {

  const { admin, loading } = useAuth()

  if (loading) return null

  if (admin) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return children
}

export default PublicRoute