import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import { contactPlugin } from "./server/contact.mjs";
export default defineConfig(({ mode }) => ({
  plugins: [
    contactPlugin(loadEnv(mode, process.cwd(), "")),
    TanStackRouterVite({ autoCodeSplitting: true, routeFileIgnorePattern: "api" }),
    react(),
  ],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
  server: { host: "127.0.0.1", port: 5177, strictPort: true },
  build: { outDir: "dist" },
}));
