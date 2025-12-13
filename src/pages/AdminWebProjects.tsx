import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const templateProject = `{
  id: "nuevo-proyecto",
  title: "Título del Proyecto",
  description: "Descripción breve del proyecto",
  category: "E-commerce", // o "Blog", "Web Corporativa", etc.
  technologies: ["React", "Tailwind CSS", "Supabase"],
  imageUrl: "/ruta-a-imagen.jpg", // o URL externa
  liveUrl: "https://ejemplo.com",
  featured: true, // o false
}`;

const AdminWebProjects = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(templateProject);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin: Proyectos Web
        </h1>
        <p className="text-muted-foreground mb-8">
          Página privada para gestionar proyectos de desarrollo web.
        </p>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Plantilla para añadir proyectos
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Copia esta plantilla y añádela al array <code className="bg-muted px-1 rounded">webProjects</code> en{" "}
              <code className="bg-muted px-1 rounded">src/components/portfolio/ProjectsSection.tsx</code>
            </p>
            
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{templateProject}</code>
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
            <h2 className="text-xl font-semibold mb-4">Pasos para añadir un proyecto</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Sube la imagen del proyecto a <code className="bg-muted px-1 rounded">src/assets/</code></li>
              <li>Abre <code className="bg-muted px-1 rounded">src/components/portfolio/ProjectsSection.tsx</code></li>
              <li>Busca el array <code className="bg-muted px-1 rounded">webProjects</code></li>
              <li>Añade un nuevo objeto usando la plantilla de arriba</li>
              <li>Actualiza los valores con la información de tu proyecto</li>
            </ol>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Estructura del proyecto</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong>id:</strong> Identificador único (slug sin espacios)</li>
              <li><strong>title:</strong> Nombre del proyecto</li>
              <li><strong>description:</strong> Descripción corta (1-2 frases)</li>
              <li><strong>category:</strong> Tipo de proyecto</li>
              <li><strong>technologies:</strong> Array de tecnologías usadas</li>
              <li><strong>imageUrl:</strong> Ruta a la imagen (local o URL)</li>
              <li><strong>liveUrl:</strong> Enlace al sitio en producción</li>
              <li><strong>featured:</strong> Si es proyecto destacado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWebProjects;
