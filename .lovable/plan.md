

## Plan: Actualizar CV y sincronizar contenido del portfolio

### Cambios detectados comparando el CV nuevo con el contenido actual

**Experiencia (Sobre Mí):** El CV incluye experiencias nuevas que no están en el portfolio:
- **Canexion** — Marketing Director (Mar 2026 – Present)
- **Akademia eñe Online** — Erasmus for Entrepreneurs (Mar 2026 – Sep 2026)
- **FITT** — período corregido: Sep 2022 – Jun 2023 (actualmente dice Mar 2021 – May 2021)
- **Ayesa** — período actualizado: Sep 2025 – Feb 2026 (actualmente dice "Actualidad")

**Herramientas (Sobre Mí):** Nuevas skills del CV:
- WooCommerce, AI integration, Product strategy, Go-to-market, Scrum/Agile, Team management, Client success, Email marketing

**Proyectos (Desarrollo Web):** El CV menciona un proyecto nuevo:
- **Kahir** — Plataforma de IA conversacional para deportes outdoor (Jul 2024 – Ene 2025)

**Hero Section:** La descripción actual podría actualizarse con el nuevo perfil del CV (más enfocado en entrepreneurship y AI).

**Archivo CV:** Reemplazar `public/Antton-CV.pdf` con el nuevo documento.

### Pasos de implementación

1. **Copiar el nuevo CV** a `public/Antton-CV.pdf` para que el botón "Descargar CV" descargue el actualizado.

2. **Actualizar fallback de experiencias** en `AboutTab.tsx`:
   - Añadir Canexion y Akademia eñe Online al principio
   - Corregir período de FITT (Sep 2022 – Jun 2023)
   - Actualizar Ayesa (Sep 2025 – Feb 2026, ya no "Actualidad")
   - Reordenar cronológicamente

3. **Actualizar fallback de herramientas** en `AboutTab.tsx`:
   - Añadir WooCommerce, AI integration y las skills de negocio

4. **Añadir proyecto Kahir** al fallback de `ProjectsSection.tsx` como nuevo proyecto de desarrollo web.

5. **Actualizar descripción del Hero** en `HeroSection.tsx` para reflejar el perfil actual (entrepreneur, AI, etc.).

### Archivos a modificar
- `public/Antton-CV.pdf` — reemplazar con el nuevo
- `src/components/portfolio/AboutTab.tsx` — experiencias y skills
- `src/components/portfolio/ProjectsSection.tsx` — añadir Kahir
- `src/components/portfolio/HeroSection.tsx` — actualizar descripción del perfil

