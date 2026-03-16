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
  const location = useLocation() // <--- hook para obtener la ruta actual

  // Función que devuelve clases según si el link está activo o no
  const linkClass = (path) =>
    `hover:text-primary ${
      location.pathname === path
        ? theme === "dark"
          ? "text-primary" // color primario en dark
          : "text-primary" // color primario en light
        : ""
    }`

  return (
    <nav className="w-full border-b border-gray-200 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-900 z-50">
      <div className="container mx-auto md:p-4 p-2 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Claudia</Link>

        <div className="flex md:gap-4 gap-3 items-center">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/packs" className={linkClass("/packs")}>Packs</Link>

          <button
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <FaShoppingCart className="h-5 w-5 cursor-pointer hover:text-primary text-gray-800 dark:text-gray-200" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Botón toggle tema */}
          <ThemeToggleButton />

          {admin && (
            <Link
              to="/admin"
              className={`flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-900 ${
                location.pathname === "/admin"
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