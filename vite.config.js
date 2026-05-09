import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_HOST = process.env.API_HOST || "localhost";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/services":  `http://${API_HOST}:5000`,
      "/favorites": `http://${API_HOST}:5000`,
    },
  },
});