import { defineConfig } from 'vite'
import { r } from './scripts/utils'
import { getSharedConfig } from './vite.config'

export default defineConfig((env) => {
  const isDev = env.mode === 'development'
  const sharedConfig = getSharedConfig(env)
  return {
    ...sharedConfig,
    build: {
      watch: isDev ? {} : undefined,
      outDir: r('app/content'),
      emptyOutDir: false,
      sourcemap: isDev ? 'inline' : false,
      cssCodeSplit: false,
      // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
      terserOptions: {
        mangle: false,
      },
      lib: {
        entry: r('src/content/app.ts'),
        name: 'contentScript',
        formats: ['iife'],
      },
      rollupOptions: {
        output: {
          entryFileNames: 'index.js',
        },
      },
    },
    plugins: [
      ...sharedConfig.plugins!,
    ],
  }
})
