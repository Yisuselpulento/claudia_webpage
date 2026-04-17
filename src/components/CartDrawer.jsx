import { useCart } from "../context/CartContext"
import ItemCard from "./Cards/ItemCard"
import { FaTimes, FaShoppingBag, FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const CartDrawer = ({ onClose }) => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    onClose()
    navigate("/checkout")
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed bg-neutral-950 border-l border-white/10 top-0 right-0 h-full w-full md:w-[380px] shadow-2xl z-50 flex flex-col">
        
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <FaShoppingBag className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Carrito</h2>
              <p className="text-gray-500 text-xs">{cartItems.length} items</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white transition"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-3">
                <FaShoppingBag className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-gray-400 text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            cartItems.map(item => (
              <ItemCard key={item._id} pack={item} />
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Total</span>
              <span className="text-xl font-bold text-white">${cartTotal}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all cursor-pointer"
            >
              Ir a Pagar
            </button>

            <button 
              onClick={() => clearCart()}
              className="w-full py-2 text-gray-500 hover:text-red-400 transition flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <FaTrash className="w-3 h-3" />
              Vaciar
            </button>
          </div>
        )}

      </div>
    </>
  )
}

export default CartDrawer