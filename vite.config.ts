import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ Use absolute root for Vercel deployment
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000, // ✅ no warning for ~691KB bundle
    rollupOptions: {
      output: {
        manualChunks: undefined, // ✅ prevent unnecessary chunk splitting
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
