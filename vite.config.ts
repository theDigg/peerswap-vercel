import { defineConfig } from "vite";
// import reactRefresh from "@vitejs/plugin-react-refresh";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import replace from "@rollup/plugin-replace";

export default defineConfig({
  // base: process.env.BASE_URL || 'https://github.com/',
  build: {
    sourcemap: process.env.SOURCE_MAP === "true",
  },
  plugins: [
    react(),
    VitePWA({
      mode: "development",
      srcDir: "src",
      filename: "sw.ts",
      base: "/",
      strategies: "injectManifest",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "PWA Inject Manifest",
        short_name: "PWA Inject",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png", // <== don't add slash, for testing
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png", // <== don't remove slash, for testing
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png", // <== don't add slash, for testing
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
    replace({
      __DATE__: new Date().toISOString(),
    }),
  ],
  define: {
    "process.env": {},
  },
});

// import { defineConfig } from "vite";
// import { VitePWA } from "vite-plugin-pwa";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), VitePWA({})],
//   define: {
//     "process.env": {},
//   },
// });
