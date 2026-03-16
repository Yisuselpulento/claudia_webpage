import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Página no encontrada</h2>
      <p className="text-gray-600 mb-6">
        Lo sentimos, parece que la página que buscas no existe.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFoundPage