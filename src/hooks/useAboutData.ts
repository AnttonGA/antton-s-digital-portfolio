import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Skill {
  id: string;
  name: string;
  category: string;
  display_order: number;
}

export interface Language {
  id: string;
  language: string;
  level: string;
  display_order: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  display_order: number;
}

// Fallback data for instant loading
const fallbackSkills: Skill[] = [
  { id: "1", name: "Google Analytics 4", category: "analytics", display_order: 0 },
  { id: "2", name: "SEMrush", category: "seo", display_order: 1 },
  { id: "3", name: "Ahrefs", category: "seo", display_order: 2 },
  { id: "4", name: "Google Tag Manager", category: "analytics", display_order: 3 },
  { id: "5", name: "Mailchimp", category: "marketing", display_order: 4 },
  { id: "6", name: "WordPress", category: "development", display_order: 5 },
  { id: "7", name: "PHP", category: "development", display_order: 6 },
  { id: "8", name: "JavaScript", category: "development", display_order: 7 },
  { id: "9", name: "Figma", category: "design", display_order: 8 },
  { id: "10", name: "GitHub", category: "development", display_order: 9 },
];

const fallbackLanguages: Language[] = [
  { id: "1", language: "Euskera", level: "Nativo", display_order: 0 },
  { id: "2", language: "Castellano", level: "Nativo", display_order: 1 },
  { id: "3", language: "Inglés", level: "C1", display_order: 2 },
  { id: "4", language: "Francés", level: "A1", display_order: 3 },
];

const fallbackExperiences: Experience[] = [
  { id: "1", company: "Ayesa", role: "Encargado de atención al cliente", period: "Sep 2025 - Actualidad", description: ["Gestión de nuevos clientes", "Crear y aplicar estrategias de retención", "Contacto directo con el cliente"], display_order: 0 },
  { id: "2", company: "Teklatam (Chile)", role: "Marketing Leader", period: "Ene 2025 - Ago 2025", description: ["Responsable de estrategias de marketing y presencia online", "Desarrollo página web", "Lanzamiento nuevos productos"], display_order: 1 },
  { id: "3", company: "Bizipoza", role: "Organización de eventos (Proyecto)", period: "Abr 2025 - May 2025", description: ["Supervisión de operaciones", "Desarrollar plan de crecimiento", "Capacitación de personal"], display_order: 2 },
  { id: "4", company: "FITT", role: "Asistente de Marketing (prácticas)", period: "Mar 2021 - May 2021", description: ["Gestión RRSS", "Desarrollo estrategia email marketing"], display_order: 3 },
  { id: "5", company: "Loco Polo", role: "Asistente de Marketing (prácticas)", period: "Mar 2021 - May 2021", description: ["Gestión RRSS", "Desarrollo página web", "Desarrollo estrategia email marketing"], display_order: 4 },
];

// Skills hooks
export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []) as Skill[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: fallbackSkills,
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (skill: Omit<Skill, "id">) => {
      const { data, error } = await supabase
        .from("skills")
        .insert(skill)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast({ title: "Herramienta añadida" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast({ title: "Herramienta eliminada" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
};

// Languages hooks
export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("languages")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []) as Language[];
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: fallbackLanguages,
  });
};

export const useCreateLanguage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (language: Omit<Language, "id">) => {
      const { data, error } = await supabase
        .from("languages")
        .insert(language)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
      toast({ title: "Idioma añadido" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("languages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
      toast({ title: "Idioma eliminado" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
};

// Experiences hooks
export const useExperiences = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []).map((exp) => ({
        ...exp,
        description: Array.isArray(exp.description) ? exp.description : [],
      })) as Experience[];
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: fallbackExperiences,
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (experience: Omit<Experience, "id">) => {
      const { data, error } = await supabase
        .from("experiences")
        .insert(experience)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast({ title: "Experiencia añadida" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("experiences").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast({ title: "Experiencia eliminada" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
};
