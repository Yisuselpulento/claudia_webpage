import  { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPackByIdFetching } from "../services/packsFetching"
import { usePacks } from "../context/PacksContext"
import { useCart } from "../context/CartContext"
import toast from "react-hot-toast"

const PackIdPage = () => {
  const { id } = useParams()
  const { getPackById, addPack } = usePacks()
  const { addToCart } = useCart()
  const [pack, setPack] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchPack = async () => {
    setLoading(true)
    const cachedPack = getPackById(id)
    if (cachedPack) {
      setPack(cachedPack)
      setLoading(false)
      return
    }
    const res = await getPackByIdFetching(id)
    setLoading(false)
    if (!res.success) return toast.error(res.message)
    setPack(res.data)
    addPack(res.data)
  }

  useEffect(() => {
    fetchPack()
  }, [id])

  if (loading) return <p>Cargando...</p>
  if (!pack) return <p>Pack no encontrado</p>

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{pack.title}</h1>

      <img
        src={pack.coverImage.url}
        alt={pack.title}
        className="w-full h-96 object-cover mb-4 rounded"
      />

      <p className="mb-2">{pack.description}</p>
      <p className="font-semibold mb-2">Precio: ${pack.price}</p>
      {pack.offer?.isActive && (
        <p className="text-green-600 font-semibold mb-2">
          Oferta: ${pack.offer.price}
        </p>
      )}
      {pack.tags.length > 0 && (
        <p className="text-sm text-gray-500 mb-2">
          Tags: {pack.tags.join(", ")}
        </p>
      )}

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={() => addToCart(pack)}
      >
        Agregar al carrito
      </button>
    </div>
  )
}

export default PackIdPage