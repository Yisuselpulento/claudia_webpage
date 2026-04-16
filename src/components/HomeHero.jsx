import OnlineStatus from "./OnlineStatus"

const HomeHero = () => {
  return (
    <div className="w-full md:h-[300px] h-[300px] relative">
      {/* Banner */}
      <img
        src="movil_wallpaper.png"
        alt="Banner Desktop"
        className="hidden sm:block w-full h-full object-cover"
      />
      <img
        src="movil_wallpaper.png"
        alt="Banner Mobile"
        className="block sm:hidden w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Contenido centrado */}
      <div className="absolute top-110  inset-0 flex flex-col items-center justify-center text-center px-4">
        {/* Imagen de perfil */}
        <img
          src="profile.png"
          alt="Profile"
          className="w-40 h-40 sm:w-56 sm:h-56 rounded-full border-3 border-black shadow-lg object-cover mb-4"
        />

        {/* Texto */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Isidora Blake</h1>
          <OnlineStatus />
        </div>
        <a
  href="https://www.instagram.com/isi.blake/"
  target="_blank"
  rel="noopener noreferrer"
  className=" hover:text-blue-500"
>
  @isi.blake
</a>

        <div>
  <p className="text-lg mt-1">
    Bienvenido a mi perfil. Si te gusta mi contenido, te invito a suscribirte!
  </p>

  <p>
    💖 Acceso al muro principal <br/>
    💖 Contenido en solitario, películas para mayores de 18 años<br/>
    💖 Publicaciones diarias <br/>
    💖 Contenido explícito disponible
  </p>

  <p>
    También puedes enviarme un mensaje directo 🥰 sinceramente, estaría abierta a una conexión más profunda también…
  </p>
</div>
      </div>
    </div>
  )
}

export default HomeHero