import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';

// vite.config.js
export default defineConfig({
  plugins: [glsl()],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
      output: {
        format: 'es',
        entryFileNames: 'main.js',
        esModule: false,
        compact: true,
        inlineDynamicImports: true,
        globals: {
          jquery: '$',
          // Supprimez les lignes suivantes :
          // gsap: 'gsap',
          // 'gsap/ScrollTrigger': 'ScrollTrigger',
        },
      },
      external: ['jquery'],
    },
  },
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger']
  },
})
