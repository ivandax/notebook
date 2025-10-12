import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import eslint from 'vite-plugin-eslint'
import checker from 'vite-plugin-checker'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), eslint(), checker({ typescript: true })],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
