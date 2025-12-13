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
      <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{image.title || "Imagen"}</DialogTitle>
        </VisuallyHidden>
        
        <div className="flex flex-col md:flex-row h-full">
          {/* Image section with navigation */}
          <div className="relative flex-1 flex items-center justify-center bg-black min-h-[300px] md:min-h-[500px]">
            {/* Previous button */}
            {hasPrevious && (
              <button
                onClick={onPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
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
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}
          </div>

          {/* Info panel */}
          <div className="w-full md:w-80 bg-card border-t md:border-t-0 md:border-l border-border p-5 flex flex-col">
            {/* Title and description */}
            <div className="mb-6">
              {image.title && (
                <h3 className="text-lg font-semibold text-foreground">{image.title}</h3>
              )}
              {image.description && (
                <p className="text-sm text-muted-foreground mt-1">{image.description}</p>
              )}
              {image.category && (
                <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full capitalize">
                  {image.category}
                </span>
              )}
            </div>

            {/* Stats section */}
            {image.stats && (
              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Estadísticas</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Likes */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Heart className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-lg font-bold text-foreground">{formatNumber(image.stats.likes)}</p>
                      <p className="text-xs text-muted-foreground">Me gusta</p>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-lg font-bold text-foreground">{formatNumber(image.stats.comments)}</p>
                      <p className="text-xs text-muted-foreground">Comentarios</p>
                    </div>
                  </div>

                  {/* Shares */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Send className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-lg font-bold text-foreground">{formatNumber(image.stats.shares)}</p>
                      <p className="text-xs text-muted-foreground">Compartidos</p>
                    </div>
                  </div>

                  {/* Saves */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Bookmark className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-lg font-bold text-foreground">{formatNumber(image.stats.saves)}</p>
                      <p className="text-xs text-muted-foreground">Guardados</p>
                    </div>
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
