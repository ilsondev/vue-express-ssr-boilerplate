import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import { fileURLToPath, URL } from 'node:url'
import { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [vue(), ssr()],
  resolve: {
    alias: {
        '@core': fileURLToPath(new URL('./src', import.meta.url)),
        '@pages': fileURLToPath(new URL('./pages', import.meta.url))
    }
}
}

export default config
