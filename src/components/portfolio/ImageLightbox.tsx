import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Heart, MessageCircle, Send, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";

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
  hasNext 
}: ImageLightboxProps) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

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
          className="w-full h-full max-h-[60vh] md:max-h-[80vh]"
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
          className="max-w-full max-h-[60vh] md:max-h-[80vh] object-contain"
        >
          Tu navegador no soporta la reproducción de video.
        </video>
      );
    }

    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] p-0 bg-background border border-divider overflow-hidden rounded-sm">
        <VisuallyHidden>
          <DialogTitle>{image.title || "Imagen"}</DialogTitle>
        </VisuallyHidden>
        
        <div className="flex flex-col md:flex-row h-full">
          {/* Media section with navigation */}
          <div className="relative flex-1 flex items-center justify-center bg-foreground/5 min-h-[300px] md:min-h-[500px]">
            {/* Previous post button */}
            {hasPrevious && !isCarousel && (
              <button
                onClick={onPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors duration-200 border border-divider"
                aria-label="Post anterior"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" strokeWidth={1.5} />
              </button>
            )}

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
              <div className="w-full h-full flex items-center justify-center">
                {renderVideoContent()}
              </div>
            ) : (
              <img
                src={carouselImages[carouselIndex]}
                alt={image.title || "Imagen de galería"}
                className="max-w-full max-h-[60vh] md:max-h-[80vh] object-contain"
              />
            )}

            {/* Next post button */}
            {hasNext && !isCarousel && (
              <button
                onClick={onNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors duration-200 border border-divider"
                aria-label="Siguiente post"
              >
                <ChevronRight className="w-4 h-4 text-foreground" strokeWidth={1.5} />
              </button>
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

          {/* Info panel */}
          <div className="w-full md:w-72 bg-background border-t md:border-t-0 md:border-l border-divider p-6 flex flex-col">
            {/* Title and description */}
            <div className="mb-6">
              {image.title && (
                <h3 className="text-base font-medium tracking-tight">{image.title}</h3>
              )}
              {image.description && (
                <p className="text-sm text-subtle mt-1 font-light">{image.description}</p>
              )}
              {image.category && (
                <span className="inline-block mt-3 text-xs font-medium text-year-accent uppercase tracking-widest">
                  {image.category}
                </span>
              )}
            </div>

            {/* Stats section */}
            {image.stats && (
              <div className="border-t border-divider pt-5">
                <h4 className="text-xs font-medium text-year-accent uppercase tracking-widest mb-4">Estadísticas</h4>
                
                <div className="space-y-3">
                  {/* Likes */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-subtle" strokeWidth={1.5} />
                      <span className="text-xs text-subtle">Me gusta</span>
                    </div>
                    <span className="text-sm font-medium">{formatNumber(image.stats.likes)}</span>
                  </div>

                  {/* Comments */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-subtle" strokeWidth={1.5} />
                      <span className="text-xs text-subtle">Comentarios</span>
                    </div>
                    <span className="text-sm font-medium">{formatNumber(image.stats.comments)}</span>
                  </div>

                  {/* Shares */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4 text-subtle" strokeWidth={1.5} />
                      <span className="text-xs text-subtle">Compartidos</span>
                    </div>
                    <span className="text-sm font-medium">{formatNumber(image.stats.shares)}</span>
                  </div>

                  {/* Saves */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-subtle" strokeWidth={1.5} />
                      <span className="text-xs text-subtle">Guardados</span>
                    </div>
                    <span className="text-sm font-medium">{formatNumber(image.stats.saves)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;
