import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-truncate-list/dist/styles.css": path.resolve(
        __dirname,
        "../../packages/react-truncate-list/src/styles.css",
      ),
      "react-truncate-list": path.resolve(
        __dirname,
        "../../packages/react-truncate-list/src",
      ),
    },
  },
});
