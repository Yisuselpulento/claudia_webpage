import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../../context/AuthContext"

const AdminLogin = () => {

  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await login(email, password)

    if (!res.success) {
      toast.error(res.message)
      return
    }

    toast.success("Bienvenido admin")
    navigate("/admin/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-lg shadow"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <div className="mb-4">
          <label className="block mb-1">Email</label>

          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>

          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default AdminLogin