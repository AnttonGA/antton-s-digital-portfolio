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
import { Image as ImageIcon, Trash2, Loader2, Film, Images, Play } from "lucide-react";
import { useSocialPosts, useCreateSocialPost, useDeleteSocialPost, SocialPost } from "@/hooks/useSocialPosts";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import MediaDropzone, { MediaFile } from "@/components/admin/MediaDropzone";

type MediaType = "image" | "carousel" | "video";

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
  title: string;
  description: string;
  category: string;
  mediaType: MediaType;
  videoUrl: string;
  thumbnailUrl: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
}

const AdminSocialPosts = () => {
  const { data: posts, isLoading } = useSocialPosts();
  const createPost = useCreateSocialPost();
  const deletePost = useDeleteSocialPost();
  const { uploadMultipleFiles, uploading } = useMediaUpload();

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [thumbnailFiles, setThumbnailFiles] = useState<MediaFile[]>([]);
  
  const [formData, setFormData] = useState<PostFormData>({
    id: "",
    title: "",
    description: "",
    category: "diseño",
    mediaType: "image",
    videoUrl: "",
    thumbnailUrl: "",
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

  const handleMediaTypeChange = (type: MediaType) => {
    setFormData((prev) => ({ ...prev, mediaType: type }));
    setMediaFiles([]);
    setThumbnailFiles([]);
  };

  const handleSave = async () => {
    if (!formData.title) return;

    let mediaUrls: string[] = [];
    let thumbnailUrl = formData.thumbnailUrl;
    let videoUrl = formData.videoUrl;

    // Upload media files
    if (mediaFiles.length > 0) {
      const files = mediaFiles.map((f) => f.file);
      mediaUrls = await uploadMultipleFiles(files);
      
      if (mediaUrls.length === 0) return; // Upload failed
    }

    // Upload thumbnail if provided
    if (thumbnailFiles.length > 0) {
      const urls = await uploadMultipleFiles([thumbnailFiles[0].file]);
      if (urls.length > 0) {
        thumbnailUrl = urls[0];
      }
    }

    // Determine main image_url
    let imageUrl = "";
    if (formData.mediaType === "image" && mediaUrls.length > 0) {
      imageUrl = mediaUrls[0];
    } else if (formData.mediaType === "carousel" && mediaUrls.length > 0) {
      imageUrl = mediaUrls[0]; // First image as cover
    } else if (formData.mediaType === "video") {
      imageUrl = thumbnailUrl || "";
    }

    if (!imageUrl && formData.mediaType !== "video") {
      return;
    }

    const postData: Omit<SocialPost, "created_at" | "updated_at"> = {
      id: formData.id,
      image_url: imageUrl,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      media_type: formData.mediaType,
      media_urls: mediaUrls,
      video_url: formData.mediaType === "video" ? videoUrl : null,
      thumbnail_url: thumbnailUrl || null,
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
      title: "",
      description: "",
      category: "diseño",
      mediaType: "image",
      videoUrl: "",
      thumbnailUrl: "",
      stats: {
        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0,
      },
    });
    setMediaFiles([]);
    setThumbnailFiles([]);
  };

  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case "carousel":
        return <Images className="w-4 h-4" />;
      case "video":
        return <Film className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  const isSaveDisabled = () => {
    if (createPost.isPending || uploading || !formData.title) return true;
    if (formData.mediaType === "video") {
      return !formData.videoUrl && mediaFiles.length === 0;
    }
    return mediaFiles.length === 0;
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Panel de Administración
        </h1>

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

              {/* Media Type Selector */}
              <div className="space-y-2">
                <Label>Tipo de contenido</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={formData.mediaType === "image" ? "default" : "outline"}
                    onClick={() => handleMediaTypeChange("image")}
                    className="flex-1"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Imagen
                  </Button>
                  <Button
                    type="button"
                    variant={formData.mediaType === "carousel" ? "default" : "outline"}
                    onClick={() => handleMediaTypeChange("carousel")}
                    className="flex-1"
                  >
                    <Images className="w-4 h-4 mr-2" />
                    Carrusel
                  </Button>
                  <Button
                    type="button"
                    variant={formData.mediaType === "video" ? "default" : "outline"}
                    onClick={() => handleMediaTypeChange("video")}
                    className="flex-1"
                  >
                    <Film className="w-4 h-4 mr-2" />
                    Video
                  </Button>
                </div>
              </div>

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

              {/* Media Upload Section */}
              {formData.mediaType !== "video" && (
                <div className="space-y-2">
                  <Label>
                    {formData.mediaType === "carousel" ? "Imágenes del carrusel *" : "Imagen *"}
                  </Label>
                  <MediaDropzone
                    files={mediaFiles}
                    onFilesChange={setMediaFiles}
                    multiple={formData.mediaType === "carousel"}
                    accept="image/*"
                    maxFiles={formData.mediaType === "carousel" ? 10 : 1}
                    uploading={uploading}
                  />
                </div>
              )}

              {/* Video Section */}
              {formData.mediaType === "video" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">URL del video (YouTube/Vimeo)</Label>
                    <Input
                      id="videoUrl"
                      value={formData.videoUrl}
                      onChange={(e) => handleFieldChange("videoUrl", e.target.value)}
                      placeholder="https://youtube.com/watch?v=... o https://vimeo.com/..."
                    />
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    — o sube un video directamente —
                  </div>

                  <div className="space-y-2">
                    <Label>Subir video (MP4)</Label>
                    <MediaDropzone
                      files={mediaFiles}
                      onFilesChange={setMediaFiles}
                      multiple={false}
                      accept="video/*"
                      uploading={uploading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Miniatura del video</Label>
                    <MediaDropzone
                      files={thumbnailFiles}
                      onFilesChange={setThumbnailFiles}
                      multiple={false}
                      accept="image/*"
                      uploading={uploading}
                    />
                  </div>
                </>
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
                    <SelectItem value="video">Video</SelectItem>
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
                  disabled={isSaveDisabled()}
                  className="flex-1"
                >
                  {createPost.isPending || uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {uploading ? "Subiendo..." : "Guardando..."}
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
                        src={post.thumbnail_url || post.image_url}
                        alt={post.title}
                        className="w-full aspect-square object-cover"
                      />
                      
                      {/* Media type indicator */}
                      {post.media_type && post.media_type !== "image" && (
                        <div className="absolute top-2 right-2 p-1.5 rounded bg-background/80">
                          {post.media_type === "carousel" && <Images className="w-4 h-4" />}
                          {post.media_type === "video" && <Play className="w-4 h-4" />}
                        </div>
                      )}
                      
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
