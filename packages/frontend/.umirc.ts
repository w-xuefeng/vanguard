import { defineConfig } from "umi";

export default defineConfig({
  base: '/_/',
  publicPath: '/_/',
  outputPath: '../backend/app/web/views/_',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      layout: false,
      component: 'login/index'
    },
    {
      path: '/home',
      component: 'home/index',
      wrappers: ['@/wrappers/auth'],
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/__internal': {
      'target': 'http://127.0.0.1:7087/',
      'changeOrigin': true,
      // 'pathRewrite': { '^/api': '' },
    }
  }
});
