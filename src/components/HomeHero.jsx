const HomeHero = () => {
  return (
    <div className="w-full md:h-[400px] h-[400px] relative">
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
        <h1 className="text-2xl font-bold">Hola, soy Isidora</h1>
        <div>
  <p className="text-lg mt-1">
    immm 18 ☺️ dfg f gfg fdgfgfdg fdg fd gfg f
  </p>

  <p>
    💖 fdg fdg dffdg <br/>
    💖 fdg fdg dfgfd fd <br/>
    💖 fdg fdgfdg ff <br/>
    💖 fdg fdg fdgfdgfdg
  </p>

  <p>
    also feel free to dm me 🥰 fdg fdgfdgfdg fdg fdgfdg sfdgd
  </p>
</div>
      </div>
    </div>
  )
}

export default HomeHero