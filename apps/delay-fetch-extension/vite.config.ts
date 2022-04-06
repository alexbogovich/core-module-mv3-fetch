import { dirname, relative } from 'path'
import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import { port, r } from './scripts/utils'

export const getSharedConfig = (env: ConfigEnv): UserConfig => {
  const isDev = env.mode === 'development'
  return {
    root: r('src'),
    resolve: {
      alias: {
        '~/': `${r('src')}/`,
      },
    },
    define: {
      __DEV__: isDev,
    },
    plugins: [
      Vue(),

      // rewrite assets to use relative path
      {
        name: 'assets-rewrite',
        enforce: 'post',
        apply: 'build',
        transformIndexHtml(html, { path }) {
          return html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`)
        },
      },
    ],
    optimizeDeps: {
      include: [
        'vue',
      ],
    },
  }
}

export default defineConfig((env) => {
  const isDev = env.mode === 'development'
  const sharedConfig = getSharedConfig(env)
  return {
    ...sharedConfig,
    base: env.command === 'serve' ? `http://localhost:${port}/` : '/',
    server: {
      port,
      hmr: {
        host: 'localhost',
      },
    },
    build: {
      cssCodeSplit: false,
      watch: isDev ? {} : undefined,
      outDir: r('app'),
      emptyOutDir: false,
      sourcemap: isDev ? 'inline' : false,
      // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
      terserOptions: {
        mangle: false,
      },
      rollupOptions: {
        input: {
          background: r('src/background/bg.ts'),
          popup: r('src/popup/popup.html'),
        },
        output: {
          entryFileNames: '[name]/index.js',
          extend: true,
        },
      },
    },
    plugins: [
      ...sharedConfig.plugins!,
      copy({
        targets: [
          { src: 'static/**/*', dest: 'app' },
        ],
        hook: 'writeBundle',
      }),
    ],
  }
})
