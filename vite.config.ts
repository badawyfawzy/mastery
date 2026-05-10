import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/mastery/",

    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
  },
});