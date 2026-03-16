import AdminDashboardButton from "../components/Buttons/AdminDashboardButton"

const Home = () => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Banner altura igual que el MainLayout */}
      <div className="w-full md:h-[160px]"></div>

      {/* Imagen de perfil flotante */}
      <div className="relative -mt-40 sm:-mt-40"> 
        {/* Ajusta -mt-32/-mt-40 para que quede mitad sobre banner */}
        <img
          src="movil_wallpaper.jpg"
          alt="Profile"
          className="w-30 h-30 sm:w-56 md:h-44 md:w-44 rounded-full border-4 border-white shadow-lg object-cover"
        />
      </div>

      {/* Texto y botón debajo */}
      <div className="mt-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Bienvenidos a mi página</h1>
        <AdminDashboardButton />
      </div>
    </div>
  )
}

export default Home