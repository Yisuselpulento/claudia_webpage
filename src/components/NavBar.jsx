import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useTheme } from "../context/ThemeContext"
import CartDrawer from "./CartDrawer"
import { useAuth } from "../context/AuthContext"
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"
import ThemeToggleButton from "./Buttons/ThemeToggleButton"

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems } = useCart()
  const { admin } = useAuth()
  const { theme } = useTheme()
  const location = useLocation()

  const linkClass = (path) =>
    `hover:text-primary ${
      location.pathname === path
        ? theme === "dark"
          ? "text-primary"
          : "text-primary"
        : ""
    }`

  return (
   <nav className="w-full fixed md:top-3 top-1 left-0  z-50 px-2 md:px-0">
  <div className="mx-auto flex justify-between items-center
                  bg-white/20 dark:bg-stone-900/40
                  backdrop-blur-md
                  shadow-md rounded-full max-w-7xl
                  border border-gray-400 dark:border-stone-500
                  md:p-2 p-1">
    {/* Logo */}
    <Link to="/" className="text-xl font-bold px-3 py-2">Clauu</Link>

    {/* Links y botones */}
    <div className="flex md:gap-4 gap-3 items-center md:px-2 px-2 md:py-1">
      <Link to="/" className={linkClass("/")}>Inicio</Link>
      <Link to="/packs" className={linkClass("/packs")}>Tienda</Link>

      {/* Carrito */}
      <button className="relative" onClick={() => setIsCartOpen(true)}>
        <FaShoppingCart className="h-5 w-5 cursor-pointer hover:text-primary text-gray-800 dark:text-gray-200" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
            {cartItems.length}
          </span>
        )}
      </button>

      <ThemeToggleButton />

      {admin && (
        <Link
          to="/admin"
          className={`flex items-center gap-1 px-3 py-1 rounded-full hover:bg-gray-900
            ${location.pathname === "/admin"
              ? theme === "dark"
                ? "bg-primary-checked text-white"
                : "bg-blue-600 text-white"
              : "bg-gray-800 text-white"
          }`}
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