import { useState } from "react";
import { Expand } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ImageLightbox, { SocialMediaItem } from "./ImageLightbox";

// Placeholder gallery data - easy to add new images
const socialMediaGallery: SocialMediaItem[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop",
    title: "Diseño de marca",
    description: "Identidad visual para startup tecnológica",
    category: "diseño",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=600&fit=crop",
    title: "Campaña digital",
    description: "Arte gráfico para redes sociales",
    category: "diseño",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop",
    title: "Fotografía de producto",
    description: "Sesión para ecommerce",
    category: "foto",
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop",
    title: "Ilustración digital",
    description: "Arte conceptual para marca",
    category: "ilustración",
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&h=600&fit=crop",
    title: "Contenido visual",
    description: "Post para Instagram",
    category: "diseño",
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=600&fit=crop",
    title: "Diseño gráfico",
    description: "Material promocional",
    category: "diseño",
  },
  {
    id: "7",
    imageUrl: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&h=600&fit=crop",
    title: "Fotografía lifestyle",
    description: "Contenido para marca personal",
    category: "foto",
  },
  {
    id: "8",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop",
    title: "Arte abstracto",
    description: "Ilustración para campaña creativa",
    category: "ilustración",
  },
  {
    id: "9",
    imageUrl: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&h=600&fit=crop",
    title: "Branding",
    description: "Diseño de identidad corporativa",
    category: "diseño",
  },
];

interface FeedItemProps {
  item: SocialMediaItem;
  index: number;
  onClick: () => void;
}

const FeedItem = ({ item, index, onClick }: FeedItemProps) => {
  const { ref, isVisible } = useScrollReveal({ 
    threshold: 0.1,
    rootMargin: "50px"
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer group transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${(index % 6) * 100}ms` }}
      onClick={onClick}
    >
      <img
        src={item.imageUrl}
        alt={item.title || "Imagen de galería"}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
        <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

const InstagramFeed = () => {
  const [selectedImage, setSelectedImage] = useState<SocialMediaItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleImageClick = (image: SocialMediaItem) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {socialMediaGallery.map((item, index) => (
          <FeedItem
            key={item.id}
            item={item}
            index={index}
            onClick={() => handleImageClick(item)}
          />
        ))}
      </div>

      <ImageLightbox
        image={selectedImage}
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
      />
    </>
  );
};

export default InstagramFeed;
