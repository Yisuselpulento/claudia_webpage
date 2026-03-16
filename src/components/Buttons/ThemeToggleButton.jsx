import { FaMoon, FaSun } from "react-icons/fa"
import { useTheme } from "../../context/ThemeContext"

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <label className="relative inline-block md:w-16 md:h-8 w-14 h-6 cursor-pointer">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isDark}
        onChange={toggleTheme}
      />

      {/* Fondo de la pastilla */}
      <span className="absolute inset-0 bg-primary dark:bg-stone-500 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-stone-700"></span>

      {/* Slider */}
      <span
        className={`absolute top-1/2 left-1 -translate-y-1/2 md:w-6 md:h-6 w-5 h-5 bg-white dark:bg-stone-900 rounded-full shadow-sm transition-transform duration-200 ease-in-out
          ${isDark ? "md:translate-x-8 translate-x-7" : "translate-x-0"}
        `}
      ></span>

      {/* Iconos a los extremos */}
      <FaSun className="absolute left-2 top-1/2 -translate-y-1/2 text-yellow-400 pointer-events-none md:h-4 md:w-4 h-3 w-3" />
      <FaMoon className="absolute right-2 top-1/2 -translate-y-1/2 dark:text-gray-300 text-stone-700 pointer-events-none md:h-4 md:w-4 h-3 w-3" />
    </label>
  )
}

export default ThemeToggleButton