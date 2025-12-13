import { useState } from "react";
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
import { Copy, Check, ImageIcon } from "lucide-react";

interface PostFormData {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
}

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const AdminSocialPosts = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    id: "",
    imageUrl: "",
    title: "",
    description: "",
    category: "diseño",
    stats: {
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
    },
  });

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      id: generateSlug(title),
    }));
  };

  const handleFieldChange = (field: keyof PostFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatChange = (stat: keyof PostFormData["stats"], value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData((prev) => ({
      ...prev,
      stats: { ...prev.stats, [stat]: numValue },
    }));
  };

  const isExternalUrl = formData.imageUrl.startsWith("http");
  const isLocalPath = formData.imageUrl.startsWith("/") || formData.imageUrl.includes("assets");

  const generateCode = (): string => {
    const imageRef = isLocalPath
      ? `miImagen // Importa arriba: import miImagen from "@/assets/nombre.jpg";`
      : `"${formData.imageUrl}"`;

    return `{
  id: "${formData.id}",
  imageUrl: ${imageRef},
  title: "${formData.title}",
  description: "${formData.description}",
  category: "${formData.category}",
  stats: {
    likes: ${formData.stats.likes},
    comments: ${formData.stats.comments},
    shares: ${formData.stats.shares},
    saves: ${formData.stats.saves},
  },
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
      imageUrl: "",
      title: "",
      description: "",
      category: "diseño",
      stats: {
        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin: Posts RRSS / Contenido
        </h1>
        <p className="text-muted-foreground mb-8">
          Rellena el formulario para generar el código del post.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Datos del post</h2>

              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Título del post"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">ID (auto-generado)</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => handleFieldChange("id", e.target.value)}
                  placeholder="slug-del-post"
                  className="text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL o ruta de imagen *</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => handleFieldChange("imageUrl", e.target.value)}
                  placeholder="https://... o /assets/imagen.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Para imágenes locales: sube primero a src/assets/ y usa la ruta
                </p>
              </div>

              {/* Vista previa de imagen */}
              {formData.imageUrl && (
                <div className="space-y-2">
                  <Label>Vista previa</Label>
                  <div className="aspect-square w-full max-w-[200px] bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    {isExternalUrl ? (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground">
                          Imagen local
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  placeholder="Descripción breve del post..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleFieldChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diseño">Diseño</SelectItem>
                    <SelectItem value="foto">Fotografía</SelectItem>
                    <SelectItem value="ilustración">Ilustración</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Estadísticas de Instagram
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Obtén estos datos desde "Ver estadísticas" en tu publicación de
                Instagram.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="likes">❤️ Me gusta</Label>
                  <Input
                    id="likes"
                    type="number"
                    min="0"
                    value={formData.stats.likes || ""}
                    onChange={(e) => handleStatChange("likes", e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">💬 Comentarios</Label>
                  <Input
                    id="comments"
                    type="number"
                    min="0"
                    value={formData.stats.comments || ""}
                    onChange={(e) => handleStatChange("comments", e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shares">📤 Compartidos</Label>
                  <Input
                    id="shares"
                    type="number"
                    min="0"
                    value={formData.stats.shares || ""}
                    onChange={(e) => handleStatChange("shares", e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="saves">🔖 Guardados</Label>
                  <Input
                    id="saves"
                    type="number"
                    min="0"
                    value={formData.stats.saves || ""}
                    onChange={(e) => handleStatChange("saves", e.target.value)}
                    placeholder="0"
                  />
                </div>
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

              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-[400px] overflow-y-auto">
                <code>{generateCode()}</code>
              </pre>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Instrucciones</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>
                  Si usas imagen local: sube la imagen a{" "}
                  <code className="bg-muted px-1 rounded">src/assets/</code>
                </li>
                <li>Rellena todos los campos del formulario</li>
                <li>Copia el código generado</li>
                <li>
                  Abre{" "}
                  <code className="bg-muted px-1 rounded">
                    src/components/portfolio/InstagramFeed.tsx
                  </code>
                </li>
                <li>
                  Añade el import de la imagen arriba del archivo (si es local)
                </li>
                <li>
                  Añade el código al array{" "}
                  <code className="bg-muted px-1 rounded">socialMediaGallery</code>
                </li>
                <li>Guarda el archivo</li>
              </ol>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">
                Ejemplo de import para imagen local
              </h2>
              <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                <code>{`import miImagen from "@/assets/mi-foto.jpg";`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSocialPosts;
