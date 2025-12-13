import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SocialPost {
  id: string;
  image_url: string;
  title: string;
  description: string;
  category: string;
  media_type: string;
  media_urls: string[];
  video_url: string | null;
  thumbnail_url: string | null;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  created_at?: string;
  updated_at?: string;
}

export const useSocialPosts = () => {
  return useQuery({
    queryKey: ["social-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Parse media_urls from JSONB
      return (data || []).map((post) => ({
        ...post,
        media_urls: Array.isArray(post.media_urls) ? post.media_urls : [],
      })) as SocialPost[];
    },
  });
};

export const useCreateSocialPost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (post: Omit<SocialPost, "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("social_posts")
        .insert({
          ...post,
          media_urls: post.media_urls || [],
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-posts"] });
      toast({
        title: "Post guardado",
        description: "El post se ha guardado correctamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteSocialPost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("social_posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-posts"] });
      toast({
        title: "Post eliminado",
        description: "El post se ha eliminado correctamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
