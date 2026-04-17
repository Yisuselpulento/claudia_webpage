import { useState, useEffect } from "react"
import { getAllSalesFetching, getSalesStatsFetching } from "../../services/salesFetching"
import { FaShoppingCart, FaDollarSign, FaChartLine, FaChevronLeft, FaChevronRight, FaArrowUp, FaArrowDown } from "react-icons/fa"

const formatPrice = (sale) => {
  const provider = sale.payment?.provider
  const total = sale.total
  
  if (provider === "mercadopago") {
    return `$${total.toLocaleString("es-CL")} CLP`
  }
  return `$${total} USD`
}

const SalesAdmin = () => {
  const [sales, setSales] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSale, setSelectedSale] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1, hasNextPage: false })

  useEffect(() => {
    loadData(1)
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [])

  const loadData = async (page = 1) => {
    setLoading(true)
    const [salesRes, statsRes] = await Promise.all([
      getAllSalesFetching(page, 10),
      getSalesStatsFetching()
    ])
    
    if (salesRes?.success) {
      setSales(salesRes.sales)
      if (salesRes.pagination) {
        setPagination(prev => ({
          ...prev,
          page: salesRes.pagination.page,
          totalPages: salesRes.pagination.totalPages,
          hasNextPage: salesRes.pagination.hasNextPage
        }))
      }
    }
    if (statsRes?.success) {
      setStats(statsRes.stats)
    }
    setLoading(false)
  }

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }))
      loadData(newPage)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getProviderBadge = (provider) => {
    if (provider === "mercadopago") {
      return (
        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">
          MP
        </span>
      )
    }
    return (
      <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-medium rounded">
        PP
      </span>
    )
  }

  const getStatusBadge = (status) => {
    const styles = {
      completed: "bg-green-500/20 text-green-400",
      pending: "bg-yellow-500/20 text-yellow-400",
      failed: "bg-red-500/20 text-red-400",
      refunded: "bg-gray-500/20 text-gray-400"
    }
    const labels = {
      completed: "Completado",
      pending: "Pendiente",
      failed: "Fallido",
      refunded: "Reembolsado"
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${styles[status] || styles.completed}`}>
        {labels[status] || status}
      </span>
    )
  }

  const currentPage = pagination.page

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-400 text-sm">Cargando datos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-8 pt-30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Panel de Ventas</h1>
          <p className="text-gray-400 text-sm">Resumen y historial de transacciones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm font-medium">Total Ventas</span>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <FaShoppingCart className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{stats?.totalSales || 0}</p>
            <div className="flex items-center gap-1 mt-2">
              <FaArrowUp className="w-3 h-3 text-green-400" />
              <span className="text-green-400 text-xs">Transacciones completadas</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm font-medium">PayPal</span>
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <FaDollarSign className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">${stats?.totalRevenue || 0}</p>
            <p className="text-gray-400 text-xs mt-1">USD</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm font-medium">MercadoPago</span>
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FaDollarSign className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">${stats?.totalRevenueCLP?.toLocaleString("es-CL") || 0}</p>
            <p className="text-gray-400 text-xs mt-1">CLP</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-semibold text-white">Historial de Transacciones</h2>
            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{sales.length} registros</span>
          </div>

          {sales.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShoppingCart className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-gray-400">No hay ventas aún</p>
              <p className="text-gray-500 text-sm mt-1">Las transacciones aparecerán aquí</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {sales.map((sale) => (
                <div 
                  key={sale._id} 
                  className="px-5 py-4 hover:bg-white/5 transition cursor-pointer"
                  onClick={() => setSelectedSale(selectedSale?._id === sale._id ? null : sale)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-medium text-white text-sm">
                            {sale.packs?.length > 0 
                              ? sale.packs.map(p => p.packId?.title || "Pack").join(", ")
                              : "Sin packs"}
                          </span>
                          <span className="shrink-0">{getProviderBadge(sale.payment?.provider)}</span>
                        </div>
                        <p className="text-gray-500 text-xs">{formatDate(sale.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-white">{formatPrice(sale)}</p>
                        {getStatusBadge(sale.status)}
                      </div>
                    </div>
                  </div>

                  {selectedSale?._id === sale._id && (
                    <div className="mt-4 pt-4 border-t border-white/10 bg-white/5 -mx-5 px-5 pb-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">ID de Pago</p>
                          <p className="font-mono text-xs bg-black/30 p-2 rounded border border-white/10 text-gray-300">
                            {sale.payment?.paymentId || sale.payment?.orderId || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Proveedor</p>
                          <p className="font-medium text-white">{sale.payment?.provider}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Estado del Pago</p>
                          <p className="font-medium text-white">{sale.payment?.status || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Packs Incluidos</p>
                          <p className="font-medium text-white">{sale.packs?.length || 0} items</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft className="w-4 h-4" />
              Anterior
            </button>
            <span className="text-gray-400 text-sm">
              Página {currentPage} de {pagination.totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SalesAdmin