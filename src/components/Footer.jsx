const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black mt-10 p-10">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} programador profesional
      </div>
    </footer>
  )
}

export default Footer