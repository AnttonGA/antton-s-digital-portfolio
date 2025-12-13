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
import { LogOut, ImageIcon, Trash2, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSocialPosts, useCreateSocialPost, useDeleteSocialPost, SocialPost } from "@/hooks/useSocialPosts";

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

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

const AdminSocialPosts = () => {
  const { signOut, user } = useAuth();
  const { data: posts, isLoading } = useSocialPosts();
  const createPost = useCreateSocialPost();
  const deletePost = useDeleteSocialPost();

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

  const handleSave = async () => {
    if (!formData.title || !formData.imageUrl) return;

    const postData: Omit<SocialPost, "created_at" | "updated_at"> = {
      id: formData.id,
      image_url: formData.imageUrl,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      likes: formData.stats.likes,
      comments: formData.stats.comments,
      shares: formData.stats.shares,
      saves: formData.stats.saves,
    };

    await createPost.mutateAsync(postData);
    resetForm();
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

  const isExternalUrl = formData.imageUrl.startsWith("http");

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-foreground">
            Panel de Administración
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <Link to="/admin/web-projects">
            <Button variant="outline">Proyectos Web</Button>
          </Link>
          <Link to="/admin/social-posts">
            <Button variant="default">Posts RRSS</Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Nuevo post</h2>

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
                <Label htmlFor="imageUrl">URL de imagen *</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => handleFieldChange("imageUrl", e.target.value)}
                  placeholder="https://..."
                />
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
                          URL inválida
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

              <div className="mt-6 flex gap-2">
                <Button 
                  onClick={handleSave} 
                  disabled={createPost.isPending || !formData.title || !formData.imageUrl}
                  className="flex-1"
                >
                  {createPost.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar post"
                  )}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Limpiar
                </Button>
              </div>
            </div>
          </div>

          {/* Lista de posts */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Posts guardados</h2>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : posts && posts.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="relative group rounded-lg overflow-hidden bg-muted"
                    >
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                        <p className="text-white text-sm font-medium text-center line-clamp-2 mb-2">
                          {post.title}
                        </p>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deletePost.mutate(post.id)}
                          disabled={deletePost.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No hay posts guardados
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSocialPosts;
