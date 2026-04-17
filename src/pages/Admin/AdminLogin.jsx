import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../../context/AuthContext"
import { FaShoppingCart, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"

const AdminLogin = () => {

  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await login(email, password)
    setLoading(false)

    if (!res.success) {
      toast.error(res.message)
      return
    }

    toast.success("Bienvenido")
    navigate("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
            <FaShoppingCart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Claudia<span className="text-primary">Shop</span>
          </h1>
          <p className="text-gray-500 mt-3 text-sm">Panel de Administración</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8"
        >
          <h2 className="text-lg font-semibold text-white mb-6 text-center">
            Iniciar Sesión
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                  <FaUser className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="admin@ejemplo.com"
                  className="w-full bg-neutral-950/80 border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-xl focus:border-primary/50 focus:outline-none transition-all placeholder:text-gray-600"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                  <FaLock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-neutral-950/80 border border-white/10 text-white pl-12 pr-12 py-3.5 rounded-xl focus:border-primary/50 focus:outline-none transition-all placeholder:text-gray-600"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition"
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verificando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="text-center text-gray-700 text-xs mt-8">
          Área restringida
        </p>
      </div>
    </div>
  )
}

export default AdminLogin