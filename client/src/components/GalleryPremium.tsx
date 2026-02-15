import { useState, useMemo } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
  span: number;
}

export default function GalleryPremium() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'welding', label: 'Spawanie' },
    { id: 'repair', label: 'Naprawa' },
    { id: 'bodywork', label: 'Karoseria' },
    { id: 'camper', label: 'Kampery' },
    { id: '4x4', label: '4x4' },
    { id: 'paint', label: 'Lakierowanie' },
    { id: 'service', label: 'Serwis' },
  ];

  // Przykładowe zdjęcia - dodaj swoje w /public/gallery/
  const galleryItems = useMemo(() => {
    const imageFiles = Array.from({ length: 16 }, (_, i) => `${i + 1}.jpg`);

    return imageFiles.map((fileName, index) => ({
      id: index + 1,
      image: `/gallery/${fileName}`,
      title: `Projekt ${index + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)].id,
      span: Math.random() > 0.7 ? 2 : 1,
    }));
  }, []);

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">Galeria</h2>
          <p className="dark:text-gray-400 text-gray-600 text-lg">
            Zobacz nasze realizacje i projekty
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-neon'
                : 'glass-dark border border-orange-500/30 dark:text-gray-200 text-gray-800 hover:border-orange-500/60 hover:bg-orange-500/10 hover:scale-105'
            }`}
          >
            Wszystkie
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-neon'
                  : 'glass-dark border border-orange-500/30 dark:text-gray-200 text-gray-800 hover:border-orange-500/60 hover:bg-orange-500/10 hover:scale-105'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`group relative overflow-hidden rounded-xl cursor-pointer animate-scale-in ${
                item.span === 2 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-12 h-12 text-orange-500 mb-4 transform scale-75 group-hover:scale-100 transition-transform duration-300" />
                  <h3 className="text-white font-bold text-lg text-center">{item.title}</h3>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/20 group-hover:via-transparent group-hover:to-orange-500/20 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full mx-4 animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-orange-500 transition-colors duration-300"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image */}
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto rounded-xl shadow-2xl"
            />

            {/* Title */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-gray-400">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
