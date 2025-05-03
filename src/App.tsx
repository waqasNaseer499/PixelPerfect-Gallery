import { useState, useEffect, useRef } from "react";
import {
  Search,
  Heart,
  HeartOff,
  X,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";
import ImageCard from "./components/ImageCard";
import { PexelsPhoto } from "./vite-env";
import Lightbox from "./components/LightBox";
import Footer from "./components/Footer";

// Main App component
export default function ImageGallery() {
  const [images, setImages] = useState<PexelsPhoto[]>([]);
  const [query, setQuery] = useState("nature");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<PexelsPhoto[]>(() => {
    let fPhotos = localStorage.getItem("favorites");
    return fPhotos ? JSON.parse(fPhotos) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<PexelsPhoto | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch images from Pexels API
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const API_KEY = import.meta.env.VITE_APP_PEXELS_API_KEY;
        
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=15`,
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );

        const data = await response.json();
        setImages(data.photos);
        setTotalPages(Math.ceil(data.total_results / 15));
      } catch (error) {
        console.error("Error fetching images:", error);
        setTotalPages(10);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite status
  const toggleFavorite = (image: PexelsPhoto) => {
    if (favorites.some((fav) => fav.id === image.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== image.id));
    } else {
      setFavorites([...favorites, image]);
    }
  };

  // Handle search submit
  const handleSearch = (e: any) => {
    e.preventDefault();
    const newQuery = searchInputRef.current?.value || "";
    if (newQuery.trim()) {
      setQuery(newQuery);
      setPage(1);
    }
  };

  // Change page
  const changePage = (direction: string) => {
    if (direction === "next" && page < totalPages) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  // Function to check if an image is in favorites
  const isFavorite = (imageId: number) => {
    return favorites.some((fav) => fav.id === imageId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-green-600 shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">
            PixelPerfect Gallery
          </h1>

          {/* Search input - using div instead of form */}
          <div className="w-full md:w-1/2 flex">
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Search for images..."
              defaultValue={query}
              className="w-full px-4 py-2 border border-gray-300 bg-white rounded-l focus:outline-none"
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
            />
            <button
              onClick={handleSearch}
              className="bg-green-800 text-white px-4 py-2 rounded-r transition"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Favorites toggle */}
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`mt-4 md:mt-0 md:ml-4 px-4 py-2 rounded flex items-center rounded-full cursor-pointer relative ${
              showFavorites
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {showFavorites ? (
              <>
                <HeartOff size={18} />
              </>
            ) : (
              <>
                <Heart size={18} />
                {!!favorites?.length && (
                  <span className="w-4 h-4 bg-red-600 rounded-full absolute top-[-8px] text-white text-[10px] right-0">
                    {favorites?.length}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Page info */}
        {!showFavorites && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              {loading ? "Loading..." : `Showing results for "${query}"`}
            </h2>
            <div className="flex items-center">
              <button
                onClick={() => changePage("prev")}
                disabled={page === 1}
                className={`p-2 rounded-l ${
                  page === 1
                    ? "bg-gray-200 text-gray-400"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="px-4 py-2 bg-white border-t border-b">
                Page {page} of {totalPages || 1}
              </span>
              <button
                onClick={() => changePage("next")}
                disabled={page === totalPages}
                className={`p-2 rounded-r ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-400"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Favorites view */}
        {showFavorites && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Your Favorites
            </h2>
            {favorites?.length === 0 && (
              <p className="text-gray-500 text-center py-10">
                You haven't saved any favorites yet. Click the heart icon on any
                image to add it to your favorites.
              </p>
            )}
          </div>
        )}

        {/* Loading state */}
        {loading && !showFavorites && (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-indigo-500" size={40} />
          </div>
        )}

        {/* Image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {showFavorites
            ? favorites.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  isFavorite={true}
                  toggleFavorite={toggleFavorite}
                  openLightbox={(val) => setLightboxImage(val)}
                />
              ))
            : !loading &&
              images.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  isFavorite={isFavorite(image.id)}
                  toggleFavorite={toggleFavorite}
                  openLightbox={setLightboxImage}
                />
              ))}
        </div>
      </main>

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          closeLightbox={() => setLightboxImage(null)}
        />
      )}

      <Footer />
    </div>
  );
}
