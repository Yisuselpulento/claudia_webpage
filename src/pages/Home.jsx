import AdminDashboardButton from "../components/Buttons/AdminDashboardButton"
import HomeHero from "../components/HomeHero"

const Home = () => {
  return (
    <div className="relative w-full">
      <HomeHero />

      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Descubre nuestros packs y ofertas exclusivas
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Explora nuestra colección cuidadosamente seleccionada y encuentra lo que necesitas.
        </p>

        <AdminDashboardButton />
      </div>
    </div>
  )
}

export default Home