import { useCart } from "../../context/CartContext"
import { FaTrash, FaTimes } from "react-icons/fa"

const ItemCard = ({ pack }) => {
  const { removeFromCart } = useCart()
  const price = pack.offer?.isActive ? pack.offer.price : pack.price

  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/5 p-2 rounded-lg hover:bg-white/10 transition">
      <img
        src={pack.coverImage?.url}
        alt={pack.title}
        className="w-12 h-12 object-cover rounded shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-white text-sm truncate">{pack.title}</h3>
        <p className="text-primary text-sm">${price}</p>
      </div>

      <button
        onClick={() => removeFromCart(pack._id)}
        className="p-1.5 text-gray-600 hover:text-red-400 transition shrink-0"
      >
        <FaTimes className="w-3 h-3" />
      </button>
    </div>
  )
}

export default ItemCard