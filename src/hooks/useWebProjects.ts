import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Feature {
  title: string;
  description: string;
}

export interface WebProject {
  id: string;
  title: string;
  year: string;
  type: string;
  description: string;
  features: Feature[];
  link: string | null;
  created_at?: string;
  updated_at?: string;
}

export const useWebProjects = () => {
  return useQuery({
    queryKey: ["web-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("web_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return (data || []).map((project) => ({
        ...project,
        features: (project.features as unknown as Feature[]) || [],
      })) as WebProject[];
    },
  });
};

export const useCreateWebProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (project: Omit<WebProject, "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("web_projects")
        .insert([{
          id: project.id,
          title: project.title,
          year: project.year,
          type: project.type,
          description: project.description,
          features: JSON.parse(JSON.stringify(project.features)),
          link: project.link,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["web-projects"] });
      toast({
        title: "Proyecto guardado",
        description: "El proyecto se ha guardado correctamente",
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

export const useDeleteWebProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("web_projects")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["web-projects"] });
      toast({
        title: "Proyecto eliminado",
        description: "El proyecto se ha eliminado correctamente",
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
