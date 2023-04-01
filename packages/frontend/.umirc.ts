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
});
