# Portfolio — Antton Gorrochategui

Portfolio personal de Antton Gorrochategui: desarrollador full-stack especializado
en integración de IA, con background de marketing. Es una single-page application
que presenta perfil, servicios, proyectos y contacto, orientada a agencias y
clientes freelance (incluida colaboración en marca blanca).

Todo el contenido está **hardcodeado en el código** (sin backend ni base de datos):
la web es estática y se sirve directamente, por lo que carga rápido y no depende de
servicios externos.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (componentes en `src/components/ui`)
- **React Router** para el enrutado
- **Bun** como gestor de paquetes y runner
- Despliegue en **Netlify**

## Estructura

```
src/
  pages/           Index (home) y NotFound
  components/
    portfolio/     Secciones de la web (Hero, Services, Projects, About, Contact, Footer)
    ui/            Componentes de shadcn/ui
  hooks/           Hooks propios (p. ej. useScrollReveal)
  assets/          Imágenes usadas por la app
public/            Estáticos servidos tal cual (CV, favicon, imagen OG, demos)
```

El contenido editable vive en los componentes de `src/components/portfolio`:

- **Perfil / titular / presentación** → `HeroSection.tsx`
- **Servicios** → `ServicesSection.tsx`
- **Proyectos** → array `projects` en `ProjectsSection.tsx`
- **Skills, idiomas, experiencia y formación** → `AboutTab.tsx`
- **Contacto** → `ContactSection.tsx`

## Desarrollo local

Requiere [Bun](https://bun.sh/docs/installation).

```sh
bun install       # instalar dependencias
bun run dev       # servidor de desarrollo (http://localhost:8080)
bun run lint      # eslint
bun run build     # build de producción en dist/
bun run preview   # servir el build de producción
```

## Despliegue

El despliegue es automático en **Netlify** a partir de la rama principal.
La configuración está en `netlify.toml`:

- Comando de build: `npm run build`
- Directorio publicado: `dist`
- Redirección SPA de `/*` a `/index.html`

## Notas

- La imagen Open Graph (`public/og-cover.jpg`) y `og:url` deberían apuntar a la URL
  absoluta del dominio final para máxima compatibilidad al compartir el enlace.
- `public/demos/` contiene demos estáticos independientes que Netlify sirve tal cual.
