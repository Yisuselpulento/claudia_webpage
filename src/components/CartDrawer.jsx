import { useCart } from "../context/CartContext"
import ItemCard from "./Cards/ItemCard"
import { FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const CartDrawer = ({ onClose }) => {
  const { cartItems, cartTotal } = useCart()

  const navigate = useNavigate()

  return (
    <div className="fixed dark:bg-stone-900 bg-white top-0 right-0 h-full md:w-2/5 w-full shadow-lg z-50 flex flex-col">
      
      {/* HEADER */}
      <div className="flex justify-between items-center p-3 border-b dark:border-stone-800 border-gray-200">
        <h2 className="text-lg font-bold">Carrito</h2>
        <button onClick={onClose}>
          <FaTimes className="h-4 w-4 dark:text-gray-200 cursor-pointer hover:text-primary text-stone-800" />
        </button>
      </div>

      {/* ITEMS */}
      <div className="flex-1 p-2 flex flex-col gap-2 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">No hay items en el carrito</p>
        ) : (
          cartItems.map(item => (
            <ItemCard key={item._id} pack={item} />
          ))
        )}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t dark:border-stone-800 border-gray-200">
        <p className="font-semibold mb-2">Total: ${cartTotal}</p>

        <button 
         onClick={() => navigate("/checkout")}
        className="w-full py-2 bg-primary text-white rounded hover:opacity-90 cursor-pointer">
          Comprar
        </button>
      </div>

    </div>
  )
}

export default CartDrawer