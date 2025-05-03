
const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>
            Image Gallery App created with React and Pexels API
          </p>
          <p className="text-gray-200 text-sm mt-2">
            © {new Date().getFullYear()} PixelPerfect Gallery. All rights reserved.
          </p>
        </div>
      </footer>
  )
}

export default Footer
