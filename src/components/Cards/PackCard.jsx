import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"

const PackCard = ({ pack, onDelete, isAdmin }) => {
  const { addToCart, cartItems } = useCart()
  const inCart = cartItems.some(item => item._id === pack._id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(pack)
  }

  return (
    <div className="border dark:border-stone-800 border-gray-200 rounded-md overflow-hidden shadow hover:shadow-lg transition bg-white dark:bg-stone-900">
      <Link to={`/packs/${pack._id}`}>
        <img
          src={pack.coverImage.url}
          alt={pack.title}
          className="w-full h-80 object-cover"
        />
      </Link>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{pack.title}</h2>
        <p className="font-semibold mb-2">Precio: ${pack.price} USD</p>
        {pack.offer?.isActive && (
          <p className="text-green-600 font-semibold">
            Oferta: ${pack.offer.price} USD
          </p>
        )}
        {pack.tags.length > 0 && (
          <p className="text-sm dark:text-gray-500 text-gray-600 mb-2">
            Tags: {pack.tags.join(", ")}
          </p>
        )}

        <button
          onClick={handleAddToCart}
          disabled={inCart}
          className={`w-full mt-2 py-2 rounded transition cursor-pointer ${
            inCart
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {inCart ? "En Carrito" : "Agregar al Carrito"}
        </button>

        <div className="flex gap-2 mt-2">
          {isAdmin && (
            <>
              <button
                onClick={() => onDelete(pack._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Update
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PackCard