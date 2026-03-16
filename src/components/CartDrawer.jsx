import { useCart } from "../context/CartContext"
import ItemCard from "./Cards/ItemCard"
import { FaTimes } from "react-icons/fa"

const CartDrawer = ({ onClose }) => {
  const { cartItems, cartTotal } = useCart()

  return (
    <div className="fixed dark:bg-stone-900 bg-white top-0 right-0 h-full md:w-2/5 w-full shadow-lg z-50 transform transition-transform">
      <div className="flex justify-between items-center p-3 border-b dark:border-stone-800 border-gray-200">
        <h2 className="text-lg font-bold">Carrito</h2>
        <button onClick={onClose}>
          <FaTimes className="h-4 w-4 dark:text-gray-200 cursor-pointer hover:text-primary text-stone-800 " />
        </button>
      </div>

      <div className="p-2 flex flex-col gap-2 overflow-y-auto h-[calc(100%-120px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">No hay items en el carrito</p>
        ) : (
          cartItems.map(item => (
            <ItemCard key={item._id} pack={item} />
          ))
        )}
      </div>

      <div className="p-4 border-t dark:border-stone-800 border-gray-200">
        <p className="font-semibold mb-2">Total: ${cartTotal}</p>
        <button className="w-full py-2 rounded cursor-not-allowed">
          Comprar
        </button>
      </div>
    </div>
  )
}

export default CartDrawer