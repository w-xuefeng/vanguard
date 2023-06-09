import { defineConfig } from "umi";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

export default defineConfig({
  title: "Vanguard",
  base: "/_/",
  publicPath: "/_/",
  outputPath: "../backend/app/web/views/_",
  routes: [
    {
      title: "Vanguard",
      path: "/",
      redirect: "/home",
    },
    {
      title: "Login | Vanguard",
      path: "/login",
      layout: false,
      component: "login/index",
      wrappers: ["@/wrappers/global", "@/wrappers/inject"],
    },
    {
      title: "Home | Vanguard",
      path: "/home",
      component: "home/index",
      wrappers: ["@/wrappers/global", "@/wrappers/inject", "@/wrappers/auth"],
    },
  ],
  npmClient: "pnpm",
  proxy: {
    "/__internal": {
      "target": "http://127.0.0.1:7087/",
      "changeOrigin": true,
    },
  },
  chainWebpack(memo, args) {
    memo.plugin("monaco-editor-webpack-plugin").use(MonacoWebpackPlugin, [
      { languages: ["json"] },
    ]);
    return memo;
  },
});
