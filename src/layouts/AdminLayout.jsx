import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FaPlus, FaShoppingCart, FaSignOutAlt, FaHome } from "react-icons/fa"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: FaHome, path: "/admin/dashboard" },
  { id: "create-pack", label: "Crear Pack", icon: FaPlus, path: "/admin/create-pack" },
  { id: "sales", label: "Ventas", icon: FaShoppingCart, path: "/admin/sales" },
]

const AdminLayout = () => {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
  }

  const isActiveSection = () => {
    const path = window.location.pathname
    if (path === "/admin/dashboard") return "dashboard"
    if (path === "/admin/create-pack") return "create-pack"
    if (path === "/admin/sales") return "sales"
    return "dashboard"
  }

  return (
    <div className="fixed inset-0 bg-black flex overflow-hidden">
      <aside className="w-64 bg-neutral-950 border-r border-white/10 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FaShoppingCart className="w-4 h-4 text-white" />
            </span>
            Claudia<span className="text-primary">Shop</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.path) navigate(item.path)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition cursor-pointer ${
                isActiveSection() === item.id
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="mb-4 px-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Admin</p>
            <p className="text-sm text-gray-300 truncate">{admin?.email || "Admin"}</p>
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

      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full w-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout