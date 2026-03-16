import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {

  const { admin, logout } = useAuth()

  const navigate = useNavigate()

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="border rounded p-6 mb-6">
        <p className="mb-2">
          <strong>Admin:</strong> {admin?.email || "Administrador"}
        </p>

        <button
          onClick={logout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        <div
          onClick={()=>navigate("/admin/create-pack")}
          className="border rounded p-6 text-center cursor-pointer hover:bg-gray-50"
        >
          <h3 className="font-semibold mb-2">Crear Pack</h3>
          <p className="text-sm text-gray-500">
            Subir nuevos packs de imágenes
          </p>
      </div>

        <div className="border rounded p-6 text-center">
          <h3 className="font-semibold mb-2">Administrar Packs</h3>
          <p className="text-sm text-gray-500">
            Editar o eliminar packs
          </p>
        </div>

        <div className="border rounded p-6 text-center">
          <h3 className="font-semibold mb-2">Estadísticas</h3>
          <p className="text-sm text-gray-500">
            Ver rendimiento de packs
          </p>
        </div>

      </div>

    </div>
  )
}

export default AdminDashboard