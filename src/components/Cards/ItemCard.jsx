import { useCart } from "../../context/CartContext"
import { FaTrash } from "react-icons/fa"

const ItemCard = ({ pack }) => {
  const { removeFromCart } = useCart()
  const price = pack.offer?.isActive ? pack.offer.price : pack.price

  return (
    <div className="flex items-center gap-4 border dark:border-stone-800 border-gray-200 p-2 rounded">
      {/* Imagen */}
      <img
        src={pack.coverImage.url}
        alt={pack.title}
        className="w-16 h-16 object-cover rounded"
      />

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold">{pack.title}</h3>
        <p className="dark:text-gray-300 text-gray-500 text-sm">Precio: ${price}</p>
      </div>

      {/* Botón eliminar */}
      <button
        onClick={() => removeFromCart(pack._id)}
        className="text-red-600 hover:text-red-800 cursor-pointer"
      >
        <FaTrash className="md:h-4 md:w-4 h-3 w-3" />
      </button>
    </div>
  )
}

export default ItemCard