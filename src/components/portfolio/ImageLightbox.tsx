import { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Heart, MessageCircle, Send, Bookmark, ChevronLeft, ChevronRight, ChevronDown, X, Lightbulb } from "lucide-react";

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
  const [currentPostIndex, setCurrentPostIndex] = useState(initialIndex);
  const [showReasoningForPost, setShowReasoningForPost] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Touch gesture state for swipe-down to close reasoning
  const reasoningTouchStartY = useRef<number>(0);
  const reasoningCurrentY = useRef<number>(0);
  const [reasoningDragOffset, setReasoningDragOffset] = useState(0);

  // Reset state when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentPostIndex(initialIndex);
      setShowReasoningForPost(null);
      setReasoningDragOffset(0);
    }
  }, [isOpen, initialIndex]);

  // Scroll to initial post when lightbox opens
  useEffect(() => {
    if (isOpen && scrollContainerRef.current && postRefs.current[initialIndex]) {
      const timeoutId = setTimeout(() => {
        postRefs.current[initialIndex]?.scrollIntoView({ behavior: "instant" });
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, initialIndex]);

  // Setup Intersection Observer after refs are populated
  useEffect(() => {
    if (!isOpen) return;

    // Delay to ensure refs are assigned
    const timeoutId = setTimeout(() => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
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
        if (ref) observerRef.current?.observe(ref);
      });
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      observerRef.current?.disconnect();
    };
  }, [isOpen, allPosts.length]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (showReasoningForPost) {
        setShowReasoningForPost(null);
      } else {
        onClose();
      }
    }
  }, [onClose, showReasoningForPost]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  // Touch handlers for swipe-down gesture on reasoning overlay
  const handleReasoningTouchStart = (e: React.TouchEvent) => {
    reasoningTouchStartY.current = e.touches[0].clientY;
    reasoningCurrentY.current = e.touches[0].clientY;
  };

  const handleReasoningTouchMove = (e: React.TouchEvent) => {
    reasoningCurrentY.current = e.touches[0].clientY;
    const diff = reasoningCurrentY.current - reasoningTouchStartY.current;
    // Only allow dragging down
    if (diff > 0) {
      setReasoningDragOffset(diff);
    }
  };

  const handleReasoningTouchEnd = () => {
    // If dragged more than 100px, close the overlay
    if (reasoningDragOffset > 100) {
      setShowReasoningForPost(null);
    }
    setReasoningDragOffset(0);
  };

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

  // Scroll to next post
  const scrollToNextPost = () => {
    if (currentPostIndex < allPosts.length - 1 && postRefs.current[currentPostIndex + 1]) {
      postRefs.current[currentPostIndex + 1]?.scrollIntoView({ behavior: "smooth" });
    }
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

  // Parse simple markdown (bold text with **)
  const parseMarkdown = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index} className="font-semibold">{boldText}</strong>;
      }
      return part;
    });
  };

  // Render reasoning content
  const renderReasoning = (post: SocialMediaItem) => {
    if (post.reasoning) {
      // Split by double newlines to create paragraphs
      const paragraphs = post.reasoning.split(/\n\n+/);
      return (
        <div className="text-foreground leading-relaxed space-y-4">
          {paragraphs.map((paragraph, idx) => (
            <p key={idx}>{parseMarkdown(paragraph)}</p>
          ))}
        </div>
      );
    }
    
    return (
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
    );
  };

  // Render a single post
  const renderPost = (post: SocialMediaItem, index: number) => {
    const isCarousel = post.mediaType === "carousel" && post.mediaUrls && post.mediaUrls.length > 1;
    const isVideo = post.mediaType === "video";
    const carouselImages = isCarousel ? post.mediaUrls! : [post.imageUrl];
    const totalCarouselImages = carouselImages.length;
    const currentCarouselIndex = getCarouselIndex(post.id);
    const isShowingReasoning = showReasoningForPost === post.id;
    const isLastPost = index === allPosts.length - 1;

    return (
      <div
        key={post.id}
        ref={(el) => { postRefs.current[index] = el; }}
        className="min-h-[95vh] flex-shrink-0 snap-start snap-always flex flex-col md:flex-row"
      >
        {/* Left Column - Media + Stats + Description (50% on desktop, full on mobile) */}
        <div className="w-full md:w-1/2 md:h-full flex flex-col border-r-0 md:border-r border-divider md:overflow-y-auto">
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
                className="max-w-full max-h-[35vh] md:max-h-[50vh] object-contain"
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
            <div className="flex-shrink-0 px-6 py-3 md:py-4 border-t border-divider">
              <div className="flex items-center justify-around">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 md:w-5 md:h-5 text-subtle" strokeWidth={1.5} />
                  <span className="text-xs md:text-sm font-medium">{formatNumber(post.stats.likes)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-subtle" strokeWidth={1.5} />
                  <span className="text-xs md:text-sm font-medium">{formatNumber(post.stats.comments)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 md:w-5 md:h-5 text-subtle" strokeWidth={1.5} />
                  <span className="text-xs md:text-sm font-medium">{formatNumber(post.stats.shares)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 md:w-5 md:h-5 text-subtle" strokeWidth={1.5} />
                  <span className="text-xs md:text-sm font-medium">{formatNumber(post.stats.saves)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Title & Description */}
          <div className="flex-shrink-0 px-4 md:px-6 py-3 md:py-4 border-t border-divider md:flex-1 md:overflow-y-auto">
            {post.title && (
              <h3 className="text-base md:text-lg font-semibold tracking-tight mb-2">{post.title}</h3>
            )}
            {post.category && (
              <span className="inline-block mb-2 md:mb-3 text-xs font-medium text-year-accent uppercase tracking-widest">
                {post.category}
              </span>
            )}
            {post.description && (
              <p className="text-sm text-subtle leading-relaxed font-light whitespace-pre-wrap">{post.description}</p>
            )}

            {/* Mobile: Button to show reasoning */}
            <button
              onClick={() => setShowReasoningForPost(post.id)}
              className="md:hidden mt-4 flex items-center gap-2 px-4 py-2.5 bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors w-full justify-center"
            >
              <Lightbulb className="w-4 h-4 text-year-accent" strokeWidth={1.5} />
              <span className="text-sm font-medium">Ver razonamiento estratégico</span>
            </button>

            {/* Mobile: Next post indicator */}
            {!isLastPost && (
              <button
                onClick={scrollToNextPost}
                className="md:hidden mt-6 mb-4 flex flex-col items-center gap-1 w-full text-subtle/60 hover:text-subtle transition-colors"
              >
                <span className="text-xs uppercase tracking-widest">Siguiente post</span>
                <ChevronDown className="w-5 h-5 animate-bounce" strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Reasoning (50% on desktop, hidden on mobile) */}
        <div className="hidden md:flex w-1/2 h-full bg-foreground/[0.02] flex-col overflow-y-auto">
          <div className="p-6 md:p-8">
            <h4 className="text-xs font-medium text-year-accent uppercase tracking-widest mb-4">
              Razonamiento estratégico
            </h4>
            <div className="prose prose-sm max-w-none">
              {renderReasoning(post)}
            </div>
          </div>
        </div>

        {/* Mobile Reasoning Overlay with swipe-down gesture */}
        {isShowingReasoning && (
          <div 
            className="md:hidden fixed inset-0 z-[60] bg-background flex flex-col animate-in slide-in-from-bottom duration-300"
            style={{ 
              transform: `translateY(${reasoningDragOffset}px)`,
              opacity: 1 - (reasoningDragOffset / 300)
            }}
            onTouchStart={handleReasoningTouchStart}
            onTouchMove={handleReasoningTouchMove}
            onTouchEnd={handleReasoningTouchEnd}
          >
            {/* Drag handle for swipe gesture */}
            <div className="flex justify-center py-2">
              <div className="w-10 h-1 bg-foreground/20 rounded-full" />
            </div>
            
            {/* Header with back button on the left */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-divider">
              <button
                onClick={() => setShowReasoningForPost(null)}
                className="flex items-center gap-1.5 text-sm text-subtle hover:text-foreground transition-colors py-1"
                aria-label="Volver al post"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                <span>Volver</span>
              </button>
              <h4 className="text-xs font-medium text-year-accent uppercase tracking-widest">
                Razonamiento
              </h4>
              {/* Spacer for alignment */}
              <div className="w-16" />
            </div>

            {/* Swipe hint */}
            <div className="text-center py-2 text-xs text-subtle/50">
              Desliza hacia abajo para cerrar
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="prose prose-sm max-w-none">
                {renderReasoning(post)}
              </div>
            </div>
          </div>
        )}
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