import { useState } from "react"
import toast from "react-hot-toast"
import { createPackFetching } from "../../services/packsFetching"

const CreatePack = () => {

  const [title,setTitle] = useState("")
  const [slug,setSlug] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [tags,setTags] = useState("")

  const [coverImage,setCoverImage] = useState(null)
  const [zipFile,setZipFile] = useState(null)

  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    if(!coverImage){
      toast.error("Debes subir una portada")
      return
    }

    if(!zipFile){
      toast.error("Debes subir el ZIP del pack")
      return
    }

    const formData = new FormData()

    formData.append("title",title)
    formData.append("slug",slug)
    formData.append("description",description)
    formData.append("price",price)

    const tagsArray = tags.split(",").map(tag => tag.trim())
    formData.append("tags", JSON.stringify(tagsArray))

    formData.append("coverImage",coverImage)
    formData.append("zipFile",zipFile)

    setLoading(true)

    const res = await createPackFetching(formData)

    setLoading(false)

    if(!res.success){
      toast.error(res.message)
      return
    }

    toast.success("Pack creado correctamente")

    setTitle("")
    setSlug("")
    setDescription("")
    setPrice("")
    setTags("")
    setCoverImage(null)
    setZipFile(null)

  }

  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Crear Pack
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Título"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Slug"
          className="w-full border p-2 rounded"
          value={slug}
          onChange={(e)=>setSlug(e.target.value)}
        />

        <textarea
          placeholder="Descripción"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="tags separados por coma"
          className="w-full border p-2 rounded"
          value={tags}
          onChange={(e)=>setTags(e.target.value)}
        />

        {/* portada */}

        <div>
          <label className="block mb-1">Cover Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e)=>setCoverImage(e.target.files[0])}
          />
        </div>

        {/* ZIP */}

        <div>
          <label className="block mb-1">ZIP del pack</label>

          <input
            type="file"
            accept=".zip"
            onChange={(e)=>setZipFile(e.target.files[0])}
          />
        </div>

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Subiendo..." : "Crear Pack"}
        </button>

      </form>

    </div>
  )
}

export default CreatePack