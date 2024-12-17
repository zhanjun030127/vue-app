import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import postCssPxToRem from 'postcss-pxtorem'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 base 为 /admin。
  base: '/',
  server: {
    port: 3060,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target:"http://122.112.180.184:8123/",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, '')
        // rewrite: (p) => p.replace(/^\/dev-api/, '')
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports:["vue","vue-router"],
      dts: 'src/auto-import.d.ts',    // 路径下自动生成文件夹存放全局指令
      eslintrc: {
        enabled: true // 使用 eslint 配置
      },
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 192, //pc端建议：192，移动端建议：75；设计稿宽度的1 / 10
          propList: ['*', '!border'], // 除 border 外所有px 转 rem // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换，这个内容可以不写
          unitPrecision: 5, // 转换后的精度，即小数点位数
          replace: true, // 是否直接更换属性值而不添加备份属性
          mediaQuery: true, // 是否在媒体查询中也转换px为rem
          minPixelValue: 0 // 设置要转换的最小像素值
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    // https://cn.vitejs.dev/config/#resolve-extensions
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "@/assets/styles/ele_ui.scss";',
      },
    },
  },
})
