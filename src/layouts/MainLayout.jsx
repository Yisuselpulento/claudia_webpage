import { Outlet } from "react-router-dom"
import Navbar from "../components/NavBar.jsx"
import Footer from "../components/Footer.jsx"
import { useLocation } from "react-router-dom"
import HomeHero from "../components/HomeHero"

const MainLayout = () => {
  const location = useLocation()

  const isHome = location.pathname === "/"

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main
        className={`flex-1 ${
          isHome ? "" : "container mx-auto px-2 py-13"
        }`}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout