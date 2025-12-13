import { useState } from "react";
import { Expand, Loader2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ImageLightbox, { SocialMediaItem } from "./ImageLightbox";
import { useSocialPosts } from "@/hooks/useSocialPosts";

// Fallback gallery data
const fallbackGallery: SocialMediaItem[] = [
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
      className={`relative aspect-square overflow-hidden cursor-pointer group transition-all duration-400 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
      onClick={onClick}
    >
      <img
        src={item.imageUrl}
        alt={item.title || "Imagen de galería"}
        className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
        loading="lazy"
      />
      {/* Minimal hover overlay */}
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-300 flex items-center justify-center">
        <Expand className="w-5 h-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
      </div>
    </div>
  );
};

const InstagramFeed = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { data: dbPosts, isLoading } = useSocialPosts();

  // Transform DB posts to SocialMediaItem format, or use fallback
  const gallery: SocialMediaItem[] = dbPosts && dbPosts.length > 0
    ? dbPosts.map((post) => ({
        id: post.id,
        imageUrl: post.image_url,
        title: post.title,
        description: post.description,
        category: post.category as "diseño" | "foto" | "ilustración" | "video",
        stats: {
          likes: post.likes,
          comments: post.comments,
          shares: post.shares,
          saves: post.saves,
        },
      }))
    : fallbackGallery;

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
    if (selectedIndex !== null && selectedIndex < gallery.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const selectedImage = selectedIndex !== null ? gallery[selectedIndex] : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-5 h-5 animate-spin text-subtle" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
        {gallery.map((item, index) => (
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
        hasNext={selectedIndex !== null && selectedIndex < gallery.length - 1}
      />
    </>
  );
};

export default InstagramFeed;
