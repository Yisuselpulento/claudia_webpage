import { Link } from "react-router-dom"

const PackCard = ({ pack, onDelete, isAdmin }) => {
  return (
    <div className="border dark:border-stone-800 border-gray-200 rounded-md overflow-hidden shadow hover:shadow-lg transition bg-white dark:bg-stone-900">
      <Link to={`/packs/${pack._id}`}>
        <img
          src={pack.coverImage.url}
          alt={pack.title}
          className="w-full h-80 object-cover"
        />
      </Link>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{pack.title}</h2>
        <p className="font-semibold mb-2">Precio: ${pack.price}</p>
        {pack.offer?.isActive && (
          <p className="text-green-600 font-semibold">
            Oferta: ${pack.offer.price}
          </p>
        )}
        {pack.tags.length > 0 && (
          <p className="text-sm dark:text-gray-500 text-gray-600 mb-2">
            Tags: {pack.tags.join(", ")}
          </p>
        )}

        <div className="flex gap-2 mt-2">
          {isAdmin && (
            <>
              <button
                onClick={() => onDelete(pack._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Update
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PackCard