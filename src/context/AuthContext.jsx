import { createContext, useContext, useEffect, useState } from "react"
import {
  adminLoginFetching,
  adminLogoutFetching,
  getAdminSessionFetching
} from "../services/adminFetching"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("adminToken"))
  const [loading, setLoading] = useState(true)

  const login = async (email, password) => {

  const res = await adminLoginFetching({ email, password })

  if (res.success) {

    localStorage.setItem("adminToken", res.token)
    setToken(res.token)

    const session = await getAdminSessionFetching()

    if (session.success) {
      setAdmin(session.admin)
    }

  }

  return res
}

  const logout = async () => {

    await adminLogoutFetching()

    localStorage.removeItem("adminToken")
    setToken(null)
    setAdmin(null)
  }

  const checkAuth = async () => {

    if (!token) {
      setLoading(false)
      return
    }

    const res = await getAdminSessionFetching()

    if (res.success) {
      setAdmin(res.admin)
    } else {
      localStorage.removeItem("adminToken")
      setToken(null)
      setAdmin(null)
    }

    setLoading(false)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/* -------------------------- HOOK -------------------------- */

export const useAuth = () => useContext(AuthContext)