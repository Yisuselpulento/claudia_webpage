import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/NavBar.jsx"
import Footer from "../components/Footer.jsx"

const MainLayout = () => {
  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fondo solo en Home, detrás del navbar */}
      {isHome && (
        <div className="absolute top-0 left-0 w-full h-64 sm:h-[500px] -z-10">
          {/* Desktop */}
          <img
            src="desktop_wallpaper.jpg"
            alt="Desktop Wallpaper"
            className="hidden sm:block w-full h-full object-cover"
          />
          {/* Mobile */}
          <img
            src="movil_wallpaper.jpg"
            alt="Mobile Wallpaper"
            className="block sm:hidden w-full h-full object-cover"
          />
          {/* Overlay opcional */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}

      {/* Navbar encima del fondo */}
      <Navbar />

      {/* Contenido */}
      <main className="flex-1 container mx-auto px-4 py-6 mt-64 sm:mt-80">
        {/* mt-64/mt-80 empuja el contenido para que no quede sobre la imagen */}
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout