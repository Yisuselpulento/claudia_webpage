import { useCart } from "../../context/CartContext"
import { FaTrash } from "react-icons/fa"

const ItemCard = ({ pack }) => {
  const { removeFromCart } = useCart()
  const price = pack.offer?.isActive ? pack.offer.price : pack.price

  return (
    <div className="flex items-center gap-4 border p-2 rounded">
      {/* Imagen */}
      <img
        src={pack.coverImage.url}
        alt={pack.title}
        className="w-16 h-16 object-cover rounded"
      />

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold">{pack.title}</h3>
        <p className="text-gray-500 text-sm">Precio: ${price}</p>
      </div>

      {/* Botón eliminar */}
      <button
        onClick={() => removeFromCart(pack._id)}
        className="text-red-600 hover:text-red-800"
      >
        <FaTrash />
      </button>
    </div>
  )
}

export default ItemCard