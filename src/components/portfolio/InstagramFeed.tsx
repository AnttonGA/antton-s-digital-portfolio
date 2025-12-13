import { useState } from "react";
import { Expand } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ImageLightbox, { SocialMediaItem } from "./ImageLightbox";

// Placeholder gallery data - easy to add new images with stats
const socialMediaGallery: SocialMediaItem[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-611162617474-5b21e879e113?w=600&h=600&fit=crop",
    title: "Diseño de marca",
    description: "Identidad visual para startup tecnológica",
    category: "diseño",
    stats: { likes: 1245, comments: 87, shares: 156, saves: 342 },
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=600&fit=crop",
    title: "Campaña digital",
    description: "Arte gráfico para redes sociales",
    category: "diseño",
    stats: { likes: 2103, comments: 124, shares: 89, saves: 567 },
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop",
    title: "Fotografía de producto",
    description: "Sesión para ecommerce",
    category: "foto",
    stats: { likes: 3456, comments: 201, shares: 312, saves: 890 },
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop",
    title: "Ilustración digital",
    description: "Arte conceptual para marca",
    category: "ilustración",
    stats: { likes: 987, comments: 56, shares: 78, saves: 234 },
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&h=600&fit=crop",
    title: "Contenido visual",
    description: "Post para Instagram",
    category: "diseño",
    stats: { likes: 4521, comments: 312, shares: 456, saves: 1023 },
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=600&fit=crop",
    title: "Diseño gráfico",
    description: "Material promocional",
    category: "diseño",
    stats: { likes: 1876, comments: 98, shares: 167, saves: 421 },
  },
  {
    id: "7",
    imageUrl: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&h=600&fit=crop",
    title: "Fotografía lifestyle",
    description: "Contenido para marca personal",
    category: "foto",
    stats: { likes: 2987, comments: 176, shares: 234, saves: 678 },
  },
  {
    id: "8",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop",
    title: "Arte abstracto",
    description: "Ilustración para campaña creativa",
    category: "ilustración",
    stats: { likes: 1543, comments: 89, shares: 112, saves: 356 },
  },
  {
    id: "9",
    imageUrl: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&h=600&fit=crop",
    title: "Branding",
    description: "Diseño de identidad corporativa",
    category: "diseño",
    stats: { likes: 5234, comments: 287, shares: 398, saves: 1245 },
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setSelectedIndex(null);
  };

  const handlePrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < socialMediaGallery.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const selectedImage = selectedIndex !== null ? socialMediaGallery[selectedIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {socialMediaGallery.map((item, index) => (
          <FeedItem
            key={item.id}
            item={item}
            index={index}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      <ImageLightbox
        image={selectedImage}
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={selectedIndex !== null && selectedIndex > 0}
        hasNext={selectedIndex !== null && selectedIndex < socialMediaGallery.length - 1}
      />
    </>
  );
};

export default InstagramFeed;
