import { Link } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import CartDrawer from "./CartDrawer"
import { useAuth } from "../context/AuthContext"
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems } = useCart()
  const { admin } = useAuth()

  return (
    <nav className="w-full border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Claudia</Link>

        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <Link to="/packs" className="hover:text-gray-600">Packs</Link>

          <button
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <FaShoppingCart className="h-6 w-6 text-gray-700" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
                {cartItems.length}
              </span>
            )}
          </button>

          {admin && (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900"
            >
              <FaUserCircle className="h-5 w-5" />
              Admin
            </Link>
          )}
        </div>
      </div>

      {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
    </nav>
  )
}

export default Navbar