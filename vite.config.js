import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import tailwindcss from "tailwindcss";
import { resolve } from 'path';
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
    registerType:'prompt',
    includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
    manifest:{
      name:"Taask",
      short_name:"Taask",
      description:"Taask - A Task management PWA built using ReactJS",
      icons:[{
        src: '/icons/192.png',
        sizes:'192x192',
        type:'image/png',
        purpose:'favicon'
      },
      {
        src:'/icons/512.png',
        sizes:'512x512',
        type:'image/png',
        purpose:'favicon'
      },
      {
        src: '/icons/180.png',
        sizes:'180x180',
        type:'image/png',
        purpose:'apple touch icon',
      },
      {
        src: '/icon512_maskable.png',
        sizes:'512x512',
        type:'image/png',
        purpose:'any maskable',
      }
    ],
    theme_color:'#171717',
    background_color:'#f0e7db',
    display:"standalone",
    scope:'/',
    start_url:"/",
    orientation:'portrait'
    }
  }

export default defineConfig({
    server: {
        port: 3001
    },

    plugins: [react(), VitePWA(manifestForPlugIn)],

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