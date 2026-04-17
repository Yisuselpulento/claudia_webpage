import { useState, useRef } from "react"
import toast from "react-hot-toast"
import { createPackFetching } from "../../services/packsFetching"
import { FaCloudUploadAlt, FaImage, FaFile, FaTimes, FaCheck } from "react-icons/fa"

const FileUpload = ({ label, accept, file, setFile, icon: Icon, color }) => {
  const inputRef = useRef(null)
  
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith(accept.split("/")[0])) {
      setFile(droppedFile)
    }
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      
      {file ? (
        <div className={`relative border-2 rounded-lg p-3 ${color} border-opacity-30`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${color} bg-opacity-20 rounded flex items-center justify-center`}>
              <Icon className={`w-4 h-4 ${color.replace('bg-', 'text-')}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{file.name}</p>
              <p className="text-gray-500 text-xs">{formatSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="p-1 text-gray-500 hover:text-red-400 transition"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-2 border-dashed ${color} border-opacity-30 rounded-xl p-4 text-center cursor-pointer hover:border-opacity-60 transition group`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => e.target.files[0] && setFile(e.target.files[0])}
          />
          <div className={`w-10 h-10 ${color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition`}>
            <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
          </div>
          <p className="text-white text-sm font-medium mb-1">Haz click o arrastra</p>
          <p className="text-gray-500 text-xs">
            {accept === "image/*" ? "PNG, JPG, WebP" : "ZIP"}
          </p>
        </div>
      )}
    </div>
  )
}

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
    <div className="max-w-4xl mx-auto pt-30">

      <h1 className="text-3xl font-bold text-white mb-2">
        Crear Pack
      </h1>
      <p className="text-gray-500 mb-8">Sube un nuevo pack para vender</p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Título</label>
            <input
              type="text"
              placeholder="Summer 2013"
              className="w-full bg-neutral-900 border border-white/10 text-white p-3 rounded-xl focus:border-primary/50 focus:outline-none transition"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Slug</label>
            <input
              type="text"
              placeholder="summer-2013"
              className="w-full bg-neutral-900 border border-white/10 text-white p-3 rounded-xl focus:border-primary/50 focus:outline-none transition"
              value={slug}
              onChange={(e)=>setSlug(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
          <textarea
            placeholder="Descripción del pack..."
            rows={3}
            className="w-full bg-neutral-900 border border-white/10 text-white p-3 rounded-xl focus:border-primary/50 focus:outline-none transition"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Precio (USD)</label>
            <input
              type="number"
              placeholder="15"
              className="w-full bg-neutral-900 border border-white/10 text-white p-3 rounded-xl focus:border-primary/50 focus:outline-none transition"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Tags</label>
            <input
              type="text"
              placeholder="summer, beach, photos"
              className="w-full bg-neutral-900 border border-white/10 text-white p-3 rounded-xl focus:border-primary/50 focus:outline-none transition"
              value={tags}
              onChange={(e)=>setTags(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Imagen de Portada"
            accept="image/*"
            file={coverImage}
            setFile={setCoverImage}
            icon={FaImage}
            color="bg-blue-500"
          />

          <FileUpload
            label="Archivo ZIP del Pack"
            accept=".zip"
            file={zipFile}
            setFile={setZipFile}
            icon={FaFile}
            color="bg-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white px-6 py-4 rounded-xl font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Subiendo archivos...
            </span>
          ) : (
            "Crear Pack"
          )}
        </button>

      </form>

    </div>
  )
}

export default CreatePack