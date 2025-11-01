import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],

  base: '/',

  build: {
    target: 'es2020',
    minify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/gsap')) {
            if (id.includes('ScrollTrigger') || id.includes('SplitText')) {
              return 'gsap-plugins';
            }
            return 'gsap-core';
          }
          if (id.includes('node_modules/react-icons')) {
            return 'icons';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    cssCodeSplit: true,

    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'gsap',
      'gsap/ScrollTrigger',
      'gsap/SplitText',
      '@gsap/react',
    ],
    exclude: ['react-icons'],
  },
});
