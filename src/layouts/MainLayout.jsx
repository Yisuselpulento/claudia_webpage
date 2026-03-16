import Navbar from "../components/NavBar.jsx"
import Footer from "../components/Footer.jsx"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}

export default MainLayout