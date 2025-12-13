import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export interface SocialMediaItem {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  category?: "diseño" | "foto" | "ilustración" | "video";
}

interface ImageLightboxProps {
  image: SocialMediaItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageLightbox = ({ image, isOpen, onClose }: ImageLightboxProps) => {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{image.title || "Imagen"}</DialogTitle>
        </VisuallyHidden>
        <div className="flex flex-col items-center justify-center p-4">
          <img
            src={image.imageUrl}
            alt={image.title || "Imagen de galería"}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          {(image.title || image.description) && (
            <div className="mt-4 text-center text-white">
              {image.title && (
                <h3 className="text-lg font-semibold">{image.title}</h3>
              )}
              {image.description && (
                <p className="text-sm text-white/70 mt-1">{image.description}</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;
