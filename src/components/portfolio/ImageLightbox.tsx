import { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Heart, MessageCircle, Send, Bookmark, ChevronLeft, ChevronRight, X } from "lucide-react";

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
  allPosts: SocialMediaItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
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
  allPosts,
  initialIndex,
  isOpen, 
  onClose
}: ImageLightboxProps) => {
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to initial post when lightbox opens
  useEffect(() => {
    if (isOpen && scrollContainerRef.current && postRefs.current[initialIndex]) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        postRefs.current[initialIndex]?.scrollIntoView({ behavior: "instant" });
        setCurrentPostIndex(initialIndex);
      }, 50);
    }
  }, [isOpen, initialIndex]);

  // Intersection Observer to track current visible post
  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = postRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setCurrentPostIndex(index);
            }
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.5,
      }
    );

    postRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isOpen, allPosts.length]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (allPosts.length === 0) return null;

  const getCarouselIndex = (postId: string) => carouselIndices[postId] || 0;
  
  const setCarouselIndex = (postId: string, index: number) => {
    setCarouselIndices(prev => ({ ...prev, [postId]: index }));
  };

  const handleCarouselPrev = (post: SocialMediaItem, totalImages: number) => {
    const current = getCarouselIndex(post.id);
    setCarouselIndex(post.id, current > 0 ? current - 1 : totalImages - 1);
  };

  const handleCarouselNext = (post: SocialMediaItem, totalImages: number) => {
    const current = getCarouselIndex(post.id);
    setCarouselIndex(post.id, current < totalImages - 1 ? current + 1 : 0);
  };

  // Render video content for a specific post
  const renderVideoContent = (post: SocialMediaItem) => {
    if (!post.videoUrl) return null;

    const embedUrl = getVideoEmbedUrl(post.videoUrl);
    
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
    
    if (isDirectVideoUrl(post.videoUrl)) {
      return (
        <video
          src={post.videoUrl}
          controls
          className="w-full max-h-[50vh] object-contain"
        >
          Tu navegador no soporta la reproducción de video.
        </video>
      );
    }

    return null;
  };

  // Render a single post
  const renderPost = (post: SocialMediaItem, index: number) => {
    const isCarousel = post.mediaType === "carousel" && post.mediaUrls && post.mediaUrls.length > 1;
    const isVideo = post.mediaType === "video";
    const carouselImages = isCarousel ? post.mediaUrls! : [post.imageUrl];
    const totalCarouselImages = carouselImages.length;
    const currentCarouselIndex = getCarouselIndex(post.id);

    return (
      <div
        key={post.id}
        ref={(el) => { postRefs.current[index] = el; }}
        className="h-[95vh] flex-shrink-0 snap-start snap-always flex flex-col md:flex-row"
      >
        {/* Left Column - Media + Stats + Description (50%) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col border-r-0 md:border-r border-divider overflow-y-auto">
          {/* Media section */}
          <div className="relative flex-shrink-0 flex items-center justify-center bg-foreground/5 min-h-[200px] md:min-h-[300px]">
            {/* Carousel navigation */}
            {isCarousel && (
              <>
                <button
                  onClick={() => handleCarouselPrev(post, totalCarouselImages)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors duration-200 border border-divider"
                  aria-label="Imagen anterior del carrusel"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => handleCarouselNext(post, totalCarouselImages)}
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
                {renderVideoContent(post)}
              </div>
            ) : (
              <img
                src={carouselImages[currentCarouselIndex]}
                alt={post.title || "Imagen de galería"}
                className="max-w-full max-h-[40vh] md:max-h-[50vh] object-contain"
                loading="lazy"
              />
            )}

            {/* Carousel dots */}
            {isCarousel && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(post.id, idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      idx === currentCarouselIndex ? "bg-foreground" : "bg-foreground/30"
                    }`}
                    aria-label={`Ir a imagen ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Carousel counter */}
            {isCarousel && (
              <div className="absolute top-4 right-4 px-2 py-1 rounded bg-background/80 text-xs font-medium z-10">
                {currentCarouselIndex + 1} / {totalCarouselImages}
              </div>
            )}
          </div>

          {/* Stats section */}
          {post.stats && (
            <div className="flex-shrink-0 px-6 py-4 border-t border-divider">
              <div className="flex items-center justify-around">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-subtle" strokeWidth={1.5} />
                  <span className="text-sm font-medium">{formatNumber(post.stats.likes)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-subtle" strokeWidth={1.5} />
                  <span className="text-sm font-medium">{formatNumber(post.stats.comments)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-subtle" strokeWidth={1.5} />
                  <span className="text-sm font-medium">{formatNumber(post.stats.shares)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-subtle" strokeWidth={1.5} />
                  <span className="text-sm font-medium">{formatNumber(post.stats.saves)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Title & Description */}
          <div className="flex-1 px-6 py-4 border-t border-divider overflow-y-auto">
            {post.title && (
              <h3 className="text-lg font-semibold tracking-tight mb-2">{post.title}</h3>
            )}
            {post.category && (
              <span className="inline-block mb-3 text-xs font-medium text-year-accent uppercase tracking-widest">
                {post.category}
              </span>
            )}
            {post.description && (
              <p className="text-sm text-subtle leading-relaxed font-light">{post.description}</p>
            )}
          </div>
        </div>

        {/* Right Column - Reasoning (50%) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-foreground/[0.02] flex flex-col overflow-y-auto">
          <div className="p-6 md:p-8">
            <h4 className="text-xs font-medium text-year-accent uppercase tracking-widest mb-4">
              Razonamiento estratégico
            </h4>
            
            {post.reasoning ? (
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {post.reasoning}
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
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] max-h-[95vh] p-0 bg-background border-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Galería de contenido</DialogTitle>
        </VisuallyHidden>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background transition-colors border border-divider"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-foreground" strokeWidth={1.5} />
        </button>

        {/* Position indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-40">
          <span className="px-3 py-1.5 rounded-full bg-background/80 text-xs text-subtle font-medium border border-divider">
            {currentPostIndex + 1} / {allPosts.length}
          </span>
        </div>
        
        {/* Scrollable container with all posts */}
        <div 
          ref={scrollContainerRef}
          className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {allPosts.map((post, index) => renderPost(post, index))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;