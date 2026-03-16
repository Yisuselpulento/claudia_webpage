import AdminDashboardButton from "../components/Buttons/AdminDashboardButton"
import HomeHero from "../components/HomeHero"
import PackCard from "../components/Cards/PackCard"
import { useAuth } from "../context/AuthContext"
import { usePacks } from "../context/PacksContext"
import { deletePackFetching } from "../services/packsFetching"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

const Home = () => {
  const { packs, loading, removePack } = usePacks()
  const { admin } = useAuth()

  const handleDelete = async (packId) => {
    if (!window.confirm("¿Estás seguro de eliminar este pack?")) return
    const res = await deletePackFetching(packId)
    if (!res.success) return toast.error(res.message)
    toast.success("Pack eliminado")
    removePack(packId)
  }

  return (
    <div className="relative w-full">
      {/* Hero */}
      <HomeHero />

      {/* Texto de bienvenida */}
      <div className="container mx-auto px-4 py-8 text-center pt-100">
        <h2 className="text-2xl font-semibold mb-4">
          Descubre mis packs y ofertas
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Explora nuestra colección cuidadosamente seleccionada y encuentra lo que necesitas.
        </p>

        <AdminDashboardButton />
      </div>

      {/* Sección de Packs */}
      <section className="mx-auto px-4 py-8 dark:bg-black bg-gray-100 flex items-center flex-col">
        <h2 className="text-3xl font-semibold mb-10 text-center p-4">Alguna de mis sesiones</h2>

        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {packs.map(pack => (
              <PackCard
                key={pack._id}
                pack={pack}
                onDelete={handleDelete}
                isAdmin={!!admin}
              />
            ))}
          </div>
        )}
      </section>
      <section className="flex justify-center py-10">
  <Link
    to="/packs"
    className="px-6 py-3 bg-primary text-white rounded-full hover:opacity-90 transition"
  >
    Ver toda la tienda
  </Link>
</section>
    </div>
  )
}

export default Home