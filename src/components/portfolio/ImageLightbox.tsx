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

const ImageLightbox = ({ 
  image, 
  isOpen, 
  onClose, 
  onPrevious, 
  onNext, 
  hasPrevious, 
  hasNext 
}: ImageLightboxProps) => {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] p-0 bg-background border border-divider overflow-hidden rounded-sm">
        <VisuallyHidden>
          <DialogTitle>{image.title || "Imagen"}</DialogTitle>
        </VisuallyHidden>
        
        <div className="flex flex-col md:flex-row h-full">
          {/* Image section with navigation */}
          <div className="relative flex-1 flex items-center justify-center bg-foreground/5 min-h-[300px] md:min-h-[500px]">
            {/* Previous button */}
            {hasPrevious && (
              <button
                onClick={onPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors duration-200 border border-divider"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" strokeWidth={1.5} />
              </button>
            )}

            <img
              src={image.imageUrl}
              alt={image.title || "Imagen de galería"}
              className="max-w-full max-h-[60vh] md:max-h-[80vh] object-contain"
            />

            {/* Next button */}
            {hasNext && (
              <button
                onClick={onNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors duration-200 border border-divider"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-4 h-4 text-foreground" strokeWidth={1.5} />
              </button>
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
