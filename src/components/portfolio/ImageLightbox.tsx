import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Heart, MessageCircle, Send, Bookmark, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

export interface SocialMediaItem {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  category?: "diseño" | "foto" | "ilustración" | "video";
  mediaType?: "image" | "carousel" | "video";
  mediaUrls?: string[];
  videoUrl?: string;
  thumbnailUrl?: string;
  reasoning?: string;
  stats?: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
}

interface ImageLightboxProps {
  image: SocialMediaItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  currentIndex?: number;
  totalItems?: number;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

// Extract video ID from YouTube or Vimeo URL
const getVideoEmbedUrl = (url: string): string | null => {
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  
  return null;
};

const isDirectVideoUrl = (url: string): boolean => {
  return /\.(mp4|webm|ogg)$/i.test(url);
};

const ImageLightbox = ({ 
  image, 
  isOpen, 
  onClose, 
  onPrevious, 
  onNext, 
  hasPrevious, 
  hasNext,
  currentIndex = 0,
  totalItems = 0
}: ImageLightboxProps) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Reset carousel index when image changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [image?.id]);

  // Handle wheel navigation with debounce
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    const threshold = 50;
    if (Math.abs(e.deltaY) < threshold) return;

    if (e.deltaY > 0 && hasNext) {
      onNext();
    } else if (e.deltaY < 0 && hasPrevious) {
      onPrevious();
    }
  }, [hasNext, hasPrevious, onNext, onPrevious]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowDown" && hasNext) {
      e.preventDefault();
      onNext();
    } else if (e.key === "ArrowUp" && hasPrevious) {
      e.preventDefault();
      onPrevious();
    } else if (e.key === "Escape") {
      onClose();
    }
  }, [hasNext, hasPrevious, onNext, onPrevious, onClose]);

  // Attach wheel and keyboard listeners
  useEffect(() => {
    if (!isOpen) return;

    let wheelTimeout: ReturnType<typeof setTimeout>;
    let canScroll = true;

    const throttledWheel = (e: WheelEvent) => {
      if (!canScroll) return;
      handleWheel(e);
      canScroll = false;
      wheelTimeout = setTimeout(() => {
        canScroll = true;
      }, 300);
    };

    window.addEventListener("wheel", throttledWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("wheel", throttledWheel);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      clearTimeout(wheelTimeout);
    };
  }, [isOpen, handleWheel, handleKeyDown]);

  if (!image) return null;

  const isCarousel = image.mediaType === "carousel" && image.mediaUrls && image.mediaUrls.length > 1;
  const isVideo = image.mediaType === "video";
  const carouselImages = isCarousel ? image.mediaUrls! : [image.imageUrl];
  const totalCarouselImages = carouselImages.length;

  const handleCarouselPrev = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : totalCarouselImages - 1));
  };

  const handleCarouselNext = () => {
    setCarouselIndex((prev) => (prev < totalCarouselImages - 1 ? prev + 1 : 0));
  };

  const handleClose = () => {
    setCarouselIndex(0);
    onClose();
  };

  // Render video content
  const renderVideoContent = () => {
    if (!image.videoUrl) return null;

    const embedUrl = getVideoEmbedUrl(image.videoUrl);
    
    if (embedUrl) {
      return (
        <iframe
          src={embedUrl}
          className="w-full aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    
    if (isDirectVideoUrl(image.videoUrl)) {
      return (
        <video
          src={image.videoUrl}
          controls
          className="w-full max-h-[50vh] object-contain"
        >
          Tu navegador no soporta la reproducción de video.
        </video>
      );
    }

    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] max-h-[95vh] p-0 bg-background border-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{image.title || "Imagen"}</DialogTitle>
        </VisuallyHidden>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background transition-colors border border-divider"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-foreground" strokeWidth={1.5} />
        </button>

        {/* Vertical navigation buttons */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 z-40 flex flex-col gap-2">
          {hasPrevious && (
            <button
              onClick={onPrevious}
              className="p-2 rounded-full bg-background/80 hover:bg-background transition-colors border border-divider"
              aria-label="Post anterior"
            >
              <ChevronUp className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </button>
          )}
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-40 flex flex-col items-center gap-2">
          {/* Position indicator */}
          {totalItems > 0 && (
            <span className="text-xs text-subtle font-medium">
              {currentIndex + 1} / {totalItems}
            </span>
          )}
          {hasNext && (
            <button
              onClick={onNext}
              className="p-2 rounded-full bg-background/80 hover:bg-background transition-colors border border-divider"
              aria-label="Siguiente post"
            >
              <ChevronDown className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </button>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Column - Media + Stats + Description (50%) */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col border-r-0 md:border-r border-divider overflow-y-auto">
            {/* Media section */}
            <div className="relative flex-shrink-0 flex items-center justify-center bg-foreground/5 min-h-[200px] md:min-h-[300px]">
              {/* Carousel navigation */}
              {isCarousel && (
                <>
                  <button
                    onClick={handleCarouselPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors duration-200 border border-divider"
                    aria-label="Imagen anterior del carrusel"
                  >
                    <ChevronLeft className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={handleCarouselNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors duration-200 border border-divider"
                    aria-label="Siguiente imagen del carrusel"
                  >
                    <ChevronRight className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                  </button>
                </>
              )}

              {/* Content */}
              {isVideo ? (
                <div className="w-full flex items-center justify-center p-4">
                  {renderVideoContent()}
                </div>
              ) : (
                <img
                  src={carouselImages[carouselIndex]}
                  alt={image.title || "Imagen de galería"}
                  className="max-w-full max-h-[40vh] md:max-h-[50vh] object-contain"
                />
              )}

              {/* Carousel dots */}
              {isCarousel && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        idx === carouselIndex ? "bg-foreground" : "bg-foreground/30"
                      }`}
                      aria-label={`Ir a imagen ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Carousel counter */}
              {isCarousel && (
                <div className="absolute top-4 right-4 px-2 py-1 rounded bg-background/80 text-xs font-medium z-10">
                  {carouselIndex + 1} / {totalCarouselImages}
                </div>
              )}
            </div>

            {/* Stats section */}
            {image.stats && (
              <div className="flex-shrink-0 px-6 py-4 border-t border-divider">
                <div className="flex items-center justify-around">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-subtle" strokeWidth={1.5} />
                    <span className="text-sm font-medium">{formatNumber(image.stats.likes)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-subtle" strokeWidth={1.5} />
                    <span className="text-sm font-medium">{formatNumber(image.stats.comments)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-subtle" strokeWidth={1.5} />
                    <span className="text-sm font-medium">{formatNumber(image.stats.shares)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-subtle" strokeWidth={1.5} />
                    <span className="text-sm font-medium">{formatNumber(image.stats.saves)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Title & Description */}
            <div className="flex-1 px-6 py-4 border-t border-divider overflow-y-auto">
              {image.title && (
                <h3 className="text-lg font-semibold tracking-tight mb-2">{image.title}</h3>
              )}
              {image.category && (
                <span className="inline-block mb-3 text-xs font-medium text-year-accent uppercase tracking-widest">
                  {image.category}
                </span>
              )}
              {image.description && (
                <p className="text-sm text-subtle leading-relaxed font-light">{image.description}</p>
              )}
            </div>
          </div>

          {/* Right Column - Reasoning (50%) */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-foreground/[0.02] flex flex-col overflow-y-auto">
            <div className="p-6 md:p-8">
              <h4 className="text-xs font-medium text-year-accent uppercase tracking-widest mb-4">
                Razonamiento estratégico
              </h4>
              
              {image.reasoning ? (
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {image.reasoning}
                  </p>
                </div>
              ) : (
                <div className="text-subtle text-sm leading-relaxed space-y-4">
                  <p>
                    Este contenido forma parte del portfolio de creación de contenido y gestión de redes sociales.
                  </p>
                  <p>
                    Cada pieza ha sido diseñada considerando:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-subtle/80">
                    <li>Objetivos de comunicación de la marca</li>
                    <li>Audiencia objetivo y sus intereses</li>
                    <li>Tendencias actuales del sector</li>
                    <li>Optimización para el algoritmo de la plataforma</li>
                    <li>Coherencia con la identidad visual</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;