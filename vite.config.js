import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import tailwindcss from "tailwindcss";
import { resolve } from 'path';

export default defineConfig({
    server: {
        port: 3000
    },

    plugins: [react()],

    css: {
        postcss: {
          plugins: [tailwindcss()],
        },
      },
    
    resolve: {

        alias: {

            components: resolve(__dirname, 'src/components'),

            assets: resolve(__dirname, 'src/assets'),

            utils: resolve(__dirname, 'src/utils'),

        },

    },

});        