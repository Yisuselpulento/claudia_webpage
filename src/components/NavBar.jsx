import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="w-full border-b ">

      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        <Link to="/" className="text-xl font-bold">
          Claudia
        </Link>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>

          <Link to="/packs" className="hover:text-gray-600">
            Packs
          </Link>
        </div>

      </div>

    </nav>
  )
}

export default Navbar