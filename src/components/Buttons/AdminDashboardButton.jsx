import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { MdAdminPanelSettings } from "react-icons/md"

const AdminDashboardButton = () => {

  const { admin, token, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) return null

  if (!admin) return null

  return (
    <button
      onClick={() => navigate("/admin/dashboard")}
      className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition"
    >
      <MdAdminPanelSettings size={24} />
    </button>
  )
}

export default AdminDashboardButton