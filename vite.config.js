import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        "@mui/material/styles",
        "@mui/icons-material/ArrowDownward",
        // Add other problematic modules here
      ],
    },
  },
});
