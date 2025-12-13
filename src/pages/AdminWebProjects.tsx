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
import { Copy, Check, Plus, Trash2 } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

interface ProjectFormData {
  id: string;
  title: string;
  year: string;
  type: string;
  description: string;
  features: Feature[];
  link: string;
}

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const AdminWebProjects = () => {
  const [copied, setCopied] = useState(false);
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

  const generateCode = (): string => {
    const featuresCode = formData.features
      .filter((f) => f.title || f.description)
      .map(
        (f) =>
          `      { title: "${f.title}", description: "${f.description}" }`
      )
      .join(",\n");

    return `{
  id: "${formData.id}",
  title: "${formData.title}",
  year: "${formData.year}",
  type: "${formData.type}",
  description: "${formData.description}",
  features: [
${featuresCode}
  ],
  link: "${formData.link}",
}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <div className="max-w-4xl mx-auto">
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
        
        <p className="text-muted-foreground mb-8">
          Rellena el formulario para generar el código del proyecto.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Datos del proyecto</h2>

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
            </div>
          </div>

          {/* Vista previa del código */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Código generado</h2>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={resetForm}>
                    Limpiar
                  </Button>
                  <Button size="sm" onClick={handleCopy}>
                    {copied ? (
                      <Check className="w-4 h-4 mr-1" />
                    ) : (
                      <Copy className="w-4 h-4 mr-1" />
                    )}
                    {copied ? "Copiado" : "Copiar"}
                  </Button>
                </div>
              </div>

              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-[500px] overflow-y-auto">
                <code>{generateCode()}</code>
              </pre>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Instrucciones</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Rellena todos los campos del formulario</li>
                <li>Copia el código generado</li>
                <li>
                  Abre{" "}
                  <code className="bg-muted px-1 rounded">
                    src/components/portfolio/ProjectsSection.tsx
                  </code>
                </li>
                <li>
                  Añade el código al array{" "}
                  <code className="bg-muted px-1 rounded">webDevProjects</code>
                </li>
                <li>Guarda el archivo</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWebProjects;
