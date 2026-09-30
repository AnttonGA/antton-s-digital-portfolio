import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // vite-react-ssg: desactivamos el inlining de CSS crítico (beasties) porque
  // reescribe el HTML e inyecta un <link> dentro de #root que rompe la hidratación.
  ssgOptions: {
    beastiesOptions: false,
  },
}));
