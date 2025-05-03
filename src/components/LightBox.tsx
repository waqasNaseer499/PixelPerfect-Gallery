import { useEffect } from "react";
import { PexelsPhoto } from "../vite-env";
import { Camera, X } from "lucide-react";

interface IProp {
    image:PexelsPhoto,
    closeLightbox:() => void
}

export default function Lightbox({ image, closeLightbox }:IProp) {
    // Prevent scrolling while lightbox is open
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, []);
  
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
        onClick={closeLightbox}
      >
        <div 
          className="relative max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 cursor-pointer rounded-full p-2 hover:bg-opacity-70"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>
          <div className="bg-white p-4 rounded-lg">
            <img
              src={image.src?.large || image.src?.medium || `/api/placeholder/800/600`}
              alt={image.alt || "Enlarged view"}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="mt-4 flex justify-between items-center">
              <p className="text-gray-700 flex gap-2">
               <Camera/> Photo by {image.photographer || "Unknown photographer"}
              </p>
              {image.url && (
                <a 
                  href={image.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  View on Pexels
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }