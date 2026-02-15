import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  resolve: {
    alias: {
      "react-truncate-list/dist/styles.css": resolve(__dirname, "../react-truncate-list/src/styles.css"),
      "react-truncate-list": resolve(__dirname, "../react-truncate-list/src/index.tsx"),
    },
  },
})
