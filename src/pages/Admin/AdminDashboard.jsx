import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { FaPlus, FaShoppingCart, FaImages, FaSignOutAlt, FaHome } from "react-icons/fa"

const AdminDashboard = () => {
  const { admin, logout, token } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("dashboard")

  useEffect(() => {
    if (!token && !admin) {
      navigate("/admin", { replace: true })
    }
  }, [token, admin, navigate])

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FaHome, path: "/admin/dashboard" },
    { id: "create-pack", label: "Crear Pack", icon: FaPlus, path: "/admin/create-pack" },
    { id: "sales", label: "Ventas", icon: FaShoppingCart, path: "/admin/sales" },
    { id: "packs", label: "Mis Packs", icon: FaImages, path: "/packs" },
  ]

  const handleLogout = async () => {
    await logout()
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Bienvenido de nuevo</h2>
              <p className="text-gray-400">Aquí está el resumen de tu tienda hoy</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-primary/50 transition cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-sm">Total Ventas</span>
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <FaShoppingCart className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">12</p>
                <p className="text-green-400 text-xs mt-1">+2 esta semana</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-primary/50 transition cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-sm">Ingresos</span>
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <FaHome className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">$150</p>
                <p className="text-green-400 text-xs mt-1">USD este mes</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-primary/50 transition cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-sm">Packs Activos</span>
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <FaImages className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">5</p>
                <p className="text-gray-400 text-xs mt-1">packs publicados</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  onClick={() => navigate("/admin/create-pack")}
                  className="p-4 bg-primary/20 border border-primary/30 rounded-lg hover:bg-primary/30 transition flex flex-col items-center gap-2 cursor-pointer"
                >
                  <FaPlus className="w-6 h-6 text-primary" />
                  <span className="text-sm text-white">Nuevo Pack</span>
                </button>
                <button
                  onClick={() => navigate("/admin/sales")}
                  className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition flex flex-col items-center gap-2 cursor-pointer"
                >
                  <FaShoppingCart className="w-6 h-6 text-gray-300" />
                  <span className="text-sm text-gray-300">Ver Ventas</span>
                </button>
              </div>
            </div>
          </div>
        )
      case "create-pack":
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Crear Nuevo Pack</h2>
            <p className="text-gray-400 mb-6">Sube un nuevo pack de imágenes para vender</p>
            <button
              onClick={() => navigate("/admin/create-pack")}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition cursor-pointer"
            >
              Ir a Crear Pack
            </button>
          </div>
        )
      case "sales":
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Historial de Ventas</h2>
            <p className="text-gray-400 mb-6">Todas tus transacciones en un solo lugar</p>
            <button
              onClick={() => navigate("/admin/sales")}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition cursor-pointer"
            >
              Ver Todas las Ventas
            </button>
          </div>
        )
      case "packs":
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Mis Packs</h2>
            <p className="text-gray-400 mb-6">Administra tus packs publicados</p>
            <button
              onClick={() => navigate("/packs")}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition cursor-pointer"
            >
              Ver Mis Packs
            </button>
          </div>
        )
      default:
        return (
          <div className="text-center text-gray-400 py-20">
            <p>Selecciona una opción del menú</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      <aside className="w-64 bg-white/5 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FaImages className="w-4 h-4 text-white" />
            </span>
            Claudia<span className="text-primary">Shop</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id)
                if (item.path) navigate(item.path)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition cursor-pointer ${
                activeSection === item.id
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="mb-4 px-4">
            <p className="text-sm text-gray-500">Conectado como</p>
            <p className="text-white text-sm font-medium truncate">{admin?.email || "Admin"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition cursor-pointer"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  )
}

export default AdminDashboard