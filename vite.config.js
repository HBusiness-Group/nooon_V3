import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/nooon_V3/", // <- TEM que ser o nome exato do repositório
});
