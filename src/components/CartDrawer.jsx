import { useCart } from "../context/CartContext"
import ItemCard from "./Cards/ItemCard"
import { FaTimes } from "react-icons/fa"

const CartDrawer = ({ onClose }) => {
  const { cartItems, cartTotal } = useCart()

  return (
    <div className="fixed top-0 right-0 h-full w-2/5 shadow-lg z-50 transform transition-transform">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Carrito</h2>
        <button onClick={onClose}>
          <FaTimes className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-120px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">No hay items en el carrito</p>
        ) : (
          cartItems.map(item => (
            <ItemCard key={item._id} pack={item} />
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <p className="font-semibold mb-2">Total: ${cartTotal}</p>
        <button className="w-full py-2 rounded cursor-not-allowed">
          Comprar
        </button>
      </div>
    </div>
  )
}

export default CartDrawer