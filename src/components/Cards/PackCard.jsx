import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { FaShoppingCart, FaCheck, FaTrash, FaEdit } from "react-icons/fa"

const PackCard = ({ pack, onDelete, isAdmin, compact }) => {
  const { addToCart, cartItems } = useCart()
  const inCart = cartItems.some(item => item._id === pack._id)
  const currentPrice = pack.offer?.isActive ? pack.offer.price : pack.price
  const hasOffer = pack.offer?.isActive

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(pack)
  }

  if (compact) {
    return (
      <Link 
        to={`/packs/${pack._id}`}
        className="group block bg-neutral-900 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all"
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={pack.coverImage?.url}
            alt={pack.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          {hasOffer && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-semibold">
              Oferta
            </div>
          )}
        </div>
        <div className="p-3">
          <h2 className="font-semibold text-white text-sm mb-1 truncate">{pack.title}</h2>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-base font-bold text-white">${currentPrice}</span>
            {hasOffer && (
              <span className="text-xs text-gray-500 line-through">${pack.price}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {pack.tags?.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={inCart}
            className={`w-full py-1.5 rounded font-medium text-xs transition flex items-center justify-center gap-1 cursor-pointer ${
              inCart
                ? "bg-green-500/20 text-green-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {inCart ? (
              <>
                <FaCheck className="w-3 h-3" />
                Añadido
              </>
            ) : (
              <>
                <FaShoppingCart className="w-3 h-3" />
                Añadir
              </>
            )}
          </button>
          {isAdmin && (
            <div className="flex gap-1 mt-2 pt-2 border-t border-white/10">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(pack._id); }}
                className="flex-1 py-1 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30 transition"
              >
                <FaTrash className="w-3 h-3" />
              </button>
              <button
                className="flex-1 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs hover:bg-yellow-500/30 transition"
              >
                <FaEdit className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link 
      to={`/packs/${pack._id}`}
      className="group block bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={pack.coverImage?.url}
          alt={pack.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {hasOffer && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Oferta
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-white mb-2 truncate">{pack.title}</h2>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-white">${currentPrice}</span>
          {hasOffer && (
            <span className="text-sm text-gray-500 line-through">${pack.price}</span>
          )}
          <span className="text-xs text-gray-500">USD</span>
        </div>

        {pack.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {pack.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={inCart}
          className={`w-full py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2 cursor-pointer ${
            inCart
              ? "bg-green-500/20 text-green-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {inCart ? (
            <>
              <FaCheck className="w-4 h-4" />
              En el carrito
            </>
          ) : (
            <>
              <FaShoppingCart className="w-4 h-4" />
              Agregar
            </>
          )}
        </button>

        {isAdmin && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(pack._id); }}
              className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition flex items-center justify-center gap-1 text-sm"
            >
              <FaTrash className="w-3 h-3" />
              Eliminar
            </button>
            <button
              className="flex-1 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition flex items-center justify-center gap-1 text-sm"
            >
              <FaEdit className="w-3 h-3" />
              Editar
            </button>
          </div>
        )}
      </div>
    </Link>
  )
}

export default PackCard