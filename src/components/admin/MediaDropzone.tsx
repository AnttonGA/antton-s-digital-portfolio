import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon, Film, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface MediaFile {
  file: File;
  preview: string;
  type: "image" | "video";
}

interface MediaDropzoneProps {
  files: MediaFile[];
  onFilesChange: (files: MediaFile[]) => void;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  uploading?: boolean;
}

const MediaDropzone = ({
  files,
  onFilesChange,
  multiple = false,
  accept = "image/*,video/*",
  maxFiles = 10,
  uploading = false,
}: MediaDropzoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;

      const fileArray = Array.from(newFiles);
      const validFiles = fileArray.slice(0, multiple ? maxFiles - files.length : 1);

      const mediaFiles: MediaFile[] = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith("video/") ? "video" : "image",
      }));

      if (multiple) {
        onFilesChange([...files, ...mediaFiles].slice(0, maxFiles));
      } else {
        // Revoke old preview URL
        files.forEach((f) => URL.revokeObjectURL(f.preview));
        onFilesChange(mediaFiles.slice(0, 1));
      }
    },
    [files, multiple, maxFiles, onFilesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = (index: number) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].preview);
    newFiles.splice(index, 1);
    onFilesChange(newFiles);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg p-8
          transition-colors duration-200 cursor-pointer
          ${isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
          ${uploading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          {uploading ? (
            <>
              <Loader2 className="w-10 h-10 text-primary mb-3 animate-spin" />
              <p className="text-sm text-muted-foreground">Subiendo archivos...</p>
            </>
          ) : (
            <>
              <Upload className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">
                Arrastra archivos aquí o haz click para seleccionar
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {multiple ? `Hasta ${maxFiles} archivos` : "Un archivo"} • Imágenes o videos
              </p>
            </>
          )}
        </div>
      </div>

      {/* File previews */}
      {files.length > 0 && (
        <div className={`grid gap-3 ${multiple ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"}`}>
          {files.map((file, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden bg-muted aspect-square"
            >
              {file.type === "video" ? (
                <div className="w-full h-full flex items-center justify-center bg-foreground/10">
                  <Film className="w-8 h-8 text-muted-foreground" />
                  <video
                    src={file.preview}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                </div>
              ) : (
                <img
                  src={file.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Remove button */}
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
                disabled={uploading}
              >
                <X className="w-3 h-3" />
              </Button>

              {/* Type indicator */}
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-background/80 text-xs">
                {file.type === "video" ? (
                  <span className="flex items-center gap-1">
                    <Film className="w-3 h-3" /> Video
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" /> Imagen
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaDropzone;
