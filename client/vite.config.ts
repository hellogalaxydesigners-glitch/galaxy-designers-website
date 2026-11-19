import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// In development the API runs on its own port; Vite forwards /api calls to it.
const API_PORT = process.env.API_PORT ?? '8787';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // The browser lazy-loads pages; the build-time renderer imports them directly.
      {
        find: '@/routes/pages',
        replacement: fileURLToPath(new URL(isSsrBuild ? './src/routes/pages.server.ts' : './src/routes/pages.ts', import.meta.url)),
      },
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
  server: {
    port: 5173,
    proxy: { '/api': `http://localhost:${API_PORT}` },
  },
  preview: {
    port: 4173,
    proxy: { '/api': `http://localhost:${API_PORT}` },
  },
  ssr: {
    // Bundle these into the prerender build so Node can run it directly.
    noExternal: ['@galaxy/shared', 'lucide-react'],
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
  },
}));
