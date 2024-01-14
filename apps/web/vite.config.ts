import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    host: true,
    port: 5454,
    proxy: {
      "/api": {
        target: "http://localhost:3005",
        changeOrigin: false,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },


    },




  },
  build: {
    target: "esnext",
  },
});
