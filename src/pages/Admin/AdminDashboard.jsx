import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { getSalesStatsFetching } from "../../services/salesFetching"
import { getPacksFetching } from "../../services/packsFetching"
import { FaPlus, FaShoppingCart, FaDollarSign } from "react-icons/fa"

const AdminDashboard = () => {
  const { admin, token } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ totalSales: 0, totalRevenue: 0, mercadopagoRevenue: 0, totalRevenueCLP: 0 })
  const [activePacks, setActivePacks] = useState(0)

  useEffect(() => {
    if (!token && !admin) {
      navigate("/admin", { replace: true })
    }

    const loadStats = async () => {
      const [salesRes, packsRes] = await Promise.all([
        getSalesStatsFetching(),
        getPacksFetching()
      ])
      if (salesRes?.success) {
        setStats(salesRes.stats)
      }
      if (packsRes?.success) {
        setActivePacks(packsRes.packs.filter(p => p.isActive).length)
      }
    }
    loadStats()
  }, [token, admin, navigate])

  return (
    <div className="p-8 w-full pt-30">
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-500 mt-1">Resumen de tu tienda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-neutral-900 border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">Total Ventas</span>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FaShoppingCart className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalSales}</p>
            <p className="text-gray-600 text-xs mt-1">transacciones</p>
          </div>

          <div className="bg-neutral-900 border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">PayPal</span>
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <FaDollarSign className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">${stats.totalRevenue || 0}</p>
            <p className="text-gray-600 text-xs mt-1">USD</p>
          </div>

          <div className="bg-neutral-900 border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">MercadoPago</span>
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <FaDollarSign className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">${stats.totalRevenueCLP?.toLocaleString("es-CL") || 0}</p>
            <p className="text-gray-600 text-xs mt-1">CLP</p>
          </div>

          <div className="bg-neutral-900 border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">Packs Activos</span>
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <FaShoppingCart className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{activePacks}</p>
            <p className="text-gray-600 text-xs mt-1">publicados</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/admin/create-pack")}
            className="p-6 bg-neutral-900 border border-white/5 rounded-xl hover:border-primary/50 transition flex items-center gap-4 cursor-pointer"
          >
            <FaPlus className="w-8 h-8 text-primary" />
            <div className="text-left">
              <p className="text-white font-medium">Nuevo Pack</p>
              <p className="text-gray-500 text-sm">Crear pack para vender</p>
            </div>
          </button>
          
          <button
            onClick={() => navigate("/admin/sales")}
            className="p-6 bg-neutral-900 border border-white/5 rounded-xl hover:bg-white/5 transition flex items-center gap-4 cursor-pointer"
          >
            <FaShoppingCart className="w-8 h-8 text-gray-400" />
            <div className="text-left">
              <p className="text-white font-medium">Ver Ventas</p>
              <p className="text-gray-500 text-sm">Historial completo</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard