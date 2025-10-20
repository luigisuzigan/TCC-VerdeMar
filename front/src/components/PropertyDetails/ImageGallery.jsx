import { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, X, Home } from 'lucide-react';

export default function ImageGallery({ images = [], title = '' }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const hasImages = images.length > 0;

  const nextImage = () => {
    if (images.length > 0) {
      setSelectedImageIndex((prev) => 
        prev === images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white hover:bg-white/10 p-2 rounded-lg transition-colors z-10"
          >
            <X size={24} />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:bg-white/10 p-2 rounded-lg transition-colors z-10"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:bg-white/10 p-2 rounded-lg transition-colors z-10"
          >
            <ChevronRight size={32} />
          </button>
          
          <img
            src={images[selectedImageIndex]}
            alt={title}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Image Gallery Grid - Arredondado e Moderno */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative">
          {hasImages ? (
            <div className="grid grid-cols-4 gap-2 h-[500px]">
              {/* Main Large Image - Arredondado */}
              <div 
                className="col-span-4 md:col-span-2 row-span-2 relative group cursor-pointer overflow-hidden rounded-3xl"
                onClick={() => { setSelectedImageIndex(0); setShowGallery(true); }}
              >
                <img
                  src={images[0]}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
              </div>
              
              {/* Grid of Smaller Images - Arredondadas */}
              {images.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  className="col-span-2 md:col-span-1 relative group cursor-pointer overflow-hidden rounded-2xl"
                  onClick={() => { setSelectedImageIndex(idx + 1); setShowGallery(true); }}
                >
                  <img
                    src={img}
                    alt={`${title} - ${idx + 2}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
                  
                  {/* Badge "Ver todas" na última imagem */}
                  {idx === 3 && images.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Camera size={32} className="mx-auto mb-2" />
                        <p className="text-lg font-semibold">+{images.length - 5} fotos</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[500px] bg-slate-100 rounded-3xl flex items-center justify-center">
              <div className="text-center text-slate-400">
                <Home size={64} className="mx-auto mb-4 opacity-50" />
                <p>Sem imagens disponíveis</p>
              </div>
            </div>
          )}
          
          {/* See All Photos Button - Moderno e flutuante */}
          {hasImages && images.length > 1 && (
            <button
              onClick={() => setShowGallery(true)}
              className="absolute bottom-6 right-6 flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 font-semibold"
            >
              <Camera size={20} />
              <span>Ver todas as {images.length} fotos</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
