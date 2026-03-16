import React, { useEffect, useState } from "react"
import { getPacksFetching, deletePackFetching } from "../services/packsFetching"
import PackCard from "../components/Cards/PackCard"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"

const PacksPage = () => {
  const [packs, setPacks] = useState([])
  const [loading, setLoading] = useState(false)
  const { admin } = useAuth()

  const fetchPacks = async () => {
    setLoading(true)
    const res = await getPacksFetching()
    setLoading(false)
    if (res.success) setPacks(res.data)
    else toast.error(res.message)
  }

  const handleDelete = async (packId) => {
    if (!window.confirm("¿Estás seguro de eliminar este pack?")) return
    const res = await deletePackFetching(packId)
    if (!res.success) return toast.error(res.message)
    toast.success("Pack eliminado")
    setPacks(packs.filter(p => p._id !== packId))
  }

  useEffect(() => {
    fetchPacks()
  }, [])

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Todos los Packs</h1>

      {loading ? (
        <p>Cargando...</p>
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
    </div>
  )
}

export default PacksPage