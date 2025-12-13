import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const templatePost = `{
  id: "post-1",
  imageUrl: "/ruta-a-imagen.jpg", // o import desde src/assets/
  title: "Título del post",
  description: "Descripción breve",
  category: "diseño", // "diseño" | "foto" | "ilustración"
  stats: {
    likes: 1234,
    comments: 56,
    shares: 78,
    saves: 90,
  },
}`;

const AdminSocialPosts = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(templatePost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin: Posts RRSS / Contenido
        </h1>
        <p className="text-muted-foreground mb-8">
          Página privada para gestionar publicaciones de redes sociales.
        </p>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Plantilla para añadir posts
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Copia esta plantilla y añádela al array <code className="bg-muted px-1 rounded">socialMediaGallery</code> en{" "}
              <code className="bg-muted px-1 rounded">src/components/portfolio/InstagramFeed.tsx</code>
            </p>
            
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{templatePost}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={handleCopy}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Pasos para añadir un post</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Sube la imagen a <code className="bg-muted px-1 rounded">src/assets/</code></li>
              <li>Abre <code className="bg-muted px-1 rounded">src/components/portfolio/InstagramFeed.tsx</code></li>
              <li>Importa la imagen arriba: <code className="bg-muted px-1 rounded">import miImagen from "@/assets/nombre.jpg";</code></li>
              <li>Busca el array <code className="bg-muted px-1 rounded">socialMediaGallery</code></li>
              <li>Añade un nuevo objeto usando la plantilla</li>
              <li>En <code className="bg-muted px-1 rounded">imageUrl</code> usa la variable importada: <code className="bg-muted px-1 rounded">imageUrl: miImagen,</code></li>
            </ol>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Estadísticas de Instagram</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Puedes obtener las estadísticas desde la app de Instagram:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm">
              <li>Abre tu publicación en Instagram</li>
              <li>Toca "Ver estadísticas" debajo del post</li>
              <li>Copia los números de: Me gusta, Comentarios, Compartidos, Guardados</li>
            </ol>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Estructura del post</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong>id:</strong> Identificador único</li>
              <li><strong>imageUrl:</strong> Imagen importada o URL externa</li>
              <li><strong>title:</strong> Título descriptivo</li>
              <li><strong>description:</strong> Descripción corta</li>
              <li><strong>category:</strong> "diseño" | "foto" | "ilustración"</li>
              <li><strong>stats.likes:</strong> Número de me gusta</li>
              <li><strong>stats.comments:</strong> Número de comentarios</li>
              <li><strong>stats.shares:</strong> Número de compartidos</li>
              <li><strong>stats.saves:</strong> Número de guardados</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSocialPosts;
