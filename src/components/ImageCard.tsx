import { Heart } from "lucide-react";
import { PexelsPhoto } from "../vite-env";

interface IProp {
  image: PexelsPhoto;
  isFavorite: boolean;
  toggleFavorite: (val: PexelsPhoto) => void;
  openLightbox: (val: PexelsPhoto) => void;
}

export default function ImageCard({
  image,
  isFavorite,
  toggleFavorite,
  openLightbox,
}: IProp) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div
        className="h-48 overflow-hidden relative cursor-pointer"
        onClick={() => openLightbox(image)}
      >
        <img
          src={image.src?.medium || `/api/placeholder/400/300`}
          alt={image.alt || "Gallery image"}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-700 truncate">
            By {image.photographer || "Unknown photographer"}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(image);
            }}
            className={`p-2 rounded-full ${
              isFavorite
                ? "text-red-500 hover:text-red-700"
                : "text-gray-400 hover:text-red-500"
            }`}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
