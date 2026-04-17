import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { usePacks } from "../context/PacksContext"
import { useCart } from "../context/CartContext"
import toast from "react-hot-toast"
import { FaShoppingCart, FaTag, FaArrowLeft, FaCheck } from "react-icons/fa"

const PackIdPage = () => {
  const { id } = useParams()
  const { refreshPack } = usePacks()
  const { addToCart, cartItems } = useCart()
  const navigate = useNavigate()
  const [pack, setPack] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchPack = async () => {
    setLoading(true)
    const packData = await refreshPack(id)
    setPack(packData)
    setLoading(false)
  }

  useEffect(() => {
    fetchPack()
  }, [id])

  const handleAddToCart = () => {
    const isInCart = cartItems.some(item => item._id === pack._id)
    if (isInCart) {
      toast.error("Ya está en el carrito")
      return
    }
    addToCart(pack)
    toast.success("Agregado al carrito")
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
  
  if (!pack) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400 mb-4">Pack no encontrado</p>
        <button 
          onClick={() => navigate("/packs")}
          className="text-primary hover:underline"
        >
          Volver a packs
        </button>
      </div>
    </div>
  )

  const isInCart = cartItems.some(item => item._id === pack._id)
  const currentPrice = pack.offer?.isActive ? pack.offer.price : pack.price
  const hasOffer = pack.offer?.isActive

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate("/packs")}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition mb-6"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="relative">
              <img
                src={pack.coverImage?.url}
                alt={pack.title}
                className="w-full aspect-square object-cover rounded-2xl"
              />
              {hasOffer && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Oferta
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">{pack.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                {pack.tags?.map((tag, i) => (
                  <span key={i} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed">
              {pack.description || "Sin descripción disponible"}
            </p>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-white">${currentPrice}</span>
              {hasOffer && (
                <span className="text-lg text-gray-500 line-through">${pack.price}</span>
              )}
              <span className="text-gray-500">USD</span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isInCart 
                  ? "bg-green-500/20 text-green-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              }`}
            >
              {isInCart ? (
                <>
                  <FaCheck className="w-5 h-5" />
                  En el carrito
                </>
              ) : (
                <>
                  <FaShoppingCart className="w-5 h-5" />
                  Agregar al carrito
                </>
              )}
            </button>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FaTag className="w-4 h-4" />
                <span>Incluye archivos en alta resolución</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FaTag className="w-4 h-4" />
                <span>Descarga inmediata</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FaTag className="w-4 h-4" />
                <span>Uso comercial permitido</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackIdPage