import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useWebProjects, useCreateWebProject, useDeleteWebProject, Feature, WebProject } from "@/hooks/useWebProjects";

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

interface ProjectFormData {
  id: string;
  title: string;
  year: string;
  type: string;
  description: string;
  features: Feature[];
  link: string;
}

const AdminWebProjects = () => {
  const { data: projects, isLoading } = useWebProjects();
  const createProject = useCreateWebProject();
  const deleteProject = useDeleteWebProject();

  const [formData, setFormData] = useState<ProjectFormData>({
    id: "",
    title: "",
    year: new Date().getFullYear().toString(),
    type: "Proyecto personal",
    description: "",
    features: [{ title: "", description: "" }],
    link: "",
  });

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      id: generateSlug(title),
    }));
  };

  const handleFieldChange = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (
    index: number,
    field: keyof Feature,
    value: string
  ) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { title: "", description: "" }],
    }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      setFormData((prev) => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) return;

    const projectData: Omit<WebProject, "created_at" | "updated_at"> = {
      id: formData.id,
      title: formData.title,
      year: formData.year,
      type: formData.type,
      description: formData.description,
      features: formData.features.filter((f) => f.title || f.description),
      link: formData.link || null,
    };

    await createProject.mutateAsync(projectData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      year: new Date().getFullYear().toString(),
      type: "Proyecto personal",
      description: "",
      features: [{ title: "", description: "" }],
      link: "",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Panel de Administración
        </h1>

        <div className="flex gap-2 mb-6">
          <Link to="/admin/web-projects">
            <Button variant="default">Proyectos Web</Button>
          </Link>
          <Link to="/admin/social-posts">
            <Button variant="outline">Posts RRSS</Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Nuevo proyecto</h2>

              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Nombre del proyecto"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">ID (auto-generado)</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => handleFieldChange("id", e.target.value)}
                  placeholder="slug-del-proyecto"
                  className="text-muted-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Año</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => handleFieldChange("year", e.target.value)}
                    placeholder="2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleFieldChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Proyecto personal">
                        Proyecto personal
                      </SelectItem>
                      <SelectItem value="Proyecto">Proyecto</SelectItem>
                      <SelectItem value="Prácticas">Prácticas</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                      <SelectItem value="Colaboración">Colaboración</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
                  }
                  placeholder="Descripción breve del proyecto..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link">Link del proyecto</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => handleFieldChange("link", e.target.value)}
                  placeholder="https://ejemplo.com"
                />
              </div>
            </div>

            {/* Features */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Características</h2>
                <Button size="sm" variant="outline" onClick={addFeature}>
                  <Plus className="w-4 h-4 mr-1" /> Añadir
                </Button>
              </div>

              <div className="space-y-4">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/50 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Feature {index + 1}
                      </span>
                      {formData.features.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFeature(index)}
                          className="h-8 w-8 p-0 text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      value={feature.title}
                      onChange={(e) =>
                        handleFeatureChange(index, "title", e.target.value)
                      }
                      placeholder="Título de la característica"
                    />
                    <Textarea
                      value={feature.description}
                      onChange={(e) =>
                        handleFeatureChange(index, "description", e.target.value)
                      }
                      placeholder="Descripción de la característica..."
                      rows={2}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <Button 
                  onClick={handleSave} 
                  disabled={createProject.isPending || !formData.title || !formData.description}
                  className="flex-1"
                >
                  {createProject.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar proyecto"
                  )}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Limpiar
                </Button>
              </div>
            </div>
          </div>

          {/* Lista de proyectos */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Proyectos guardados</h2>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : projects && projects.length > 0 ? (
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 bg-muted/50 rounded-lg flex items-start justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.year} · {project.type}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteProject.mutate(project.id)}
                        className="text-destructive shrink-0"
                        disabled={deleteProject.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No hay proyectos guardados
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWebProjects;
