import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({root:'pages',base:'/meet-day/',plugins:[react()],build:{outDir:'../docs',emptyOutDir:true}});
