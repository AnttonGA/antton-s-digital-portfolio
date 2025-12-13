import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UploadedFile {
  file: File;
  preview: string;
  url?: string;
  uploading?: boolean;
}

export const useMediaUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await supabase.storage
      .from("social-media")
      .upload(filePath, file);

    if (error) {
      toast({
        title: "Error al subir archivo",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("social-media")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const uploadMultipleFiles = async (files: File[]): Promise<string[]> => {
    setUploading(true);
    const urls: string[] = [];

    for (const file of files) {
      const url = await uploadFile(file);
      if (url) {
        urls.push(url);
      }
    }

    setUploading(false);
    return urls;
  };

  const deleteFile = async (url: string): Promise<boolean> => {
    // Extract file path from URL
    const urlParts = url.split("/social-media/");
    if (urlParts.length < 2) return false;
    
    const filePath = urlParts[1];
    
    const { error } = await supabase.storage
      .from("social-media")
      .remove([filePath]);

    if (error) {
      toast({
        title: "Error al eliminar archivo",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    uploading,
  };
};
