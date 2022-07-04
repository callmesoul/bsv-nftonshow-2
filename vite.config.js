import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import Components from 'unplugin-vue-components/vite'
import VitePluginHtmlEnv from 'vite-plugin-html-env'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import builtins from 'rollup-plugin-node-builtins'

const builtinsPlugin = { ...builtins({ crypto: true }), name: 'rollup-plugin-node-builtins' }
const timestamp = Date.now()
export default ({ mode }) => {
  // 加载环境配置文件
  // const env = require('dotenv').config({ path: `./.env.${mode}` });
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => tag.includes('show-'),
          },
        },
      }),
      // element-plus 按需加载
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
      // 多语言加载
      vueI18n({
        // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
        // compositionOnly: false,

        // you need to set i18n resource including paths !
        include: path.resolve(__dirname, './src/languages/**'),
      }),
      svgLoader(),
      VitePluginHtmlEnv(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      _APP_VERSION: JSON.stringify(pkg.version),
    },
    server: {
      host: env.VITE_Hosts.replace(/https:\/\//, '').replace(/http:\/\//, ''),
      // host: '0.0.0.0',
      port: 443,
      https: true,
      open: false,
      // 本地调试， 需先把接口的 baseurl 设置为 '', 然后 target 指向对应 ip
      // proxy: {
      //   '/api': {
      //     target: 'http://192.168.168.184:8012',
      //     changeOrigin: true,
      //   },
      // },
    },
    build: {
      target: mode === 'prod' ? 'es2015' : 'esnext',
      minify: mode === 'prod' ? 'esbuild' : false,
      sourcemap: mode === 'prod' ? false : 'inline',
      rollupOptions: {
        output: {
          sourcemap: mode === 'prod' ? false : 'inline',
        },
      },
    },
    esbuild: {
      drop: mode === 'prod' ? ['console', 'debugger'] : [],
    },
    rollupInputOptions: {
      preserveEntrySignatures: 'strict',
      plugins: [builtinsPlugin],
    },
    sourcemap: mode === 'prod' ? false : 'inline',
  })
}
