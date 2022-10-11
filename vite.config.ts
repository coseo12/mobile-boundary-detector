import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { obfuscator } from "rollup-obfuscator";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [vue(), obfuscator()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    fs: {
      allow: [".."],
    },
  },
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/scss/_variables.scss";`,
      },
    },
  },
}));
