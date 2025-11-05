import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    cloudflare(),
  ],
  resolve: {
    alias: {
      ".prisma/client/default": path.resolve(
        __dirname,
        "./node_modules/.prisma/client/default.js"
      ),
    },
  },
});
