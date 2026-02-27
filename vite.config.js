import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// Multi-page build (Cloudflare Pages + GitHub Pages friendly)
// - index.html (home)
// - equipamentos.html (equipamentos de pagamento)
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        equipamentos: resolve(__dirname, "equipamentos.html"),
      },
    },
  },
});
