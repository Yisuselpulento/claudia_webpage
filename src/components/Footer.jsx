const Footer = () => {
  return (
    <footer className="border-t dark:border-stone-800 border-gray-200 mt-10">

      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ImagePacks. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer