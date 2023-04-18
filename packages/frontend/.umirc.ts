import { defineConfig } from "umi";

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
    memo.entry("editor.worker")
      .add("monaco-editor/esm/vs/editor/editor.worker.js")
      .end();
    memo.entry("json.worker")
      .add("monaco-editor/esm/vs/language/json/json.worker")
      .end();
    memo.entry("css.worker")
      .add("monaco-editor/esm/vs/language/css/css.worker")
      .end();
    memo.entry("html.worker")
      .add("monaco-editor/esm/vs/language/html/html.worker")
      .end();
    memo.entry("ts.worker")
      .add("monaco-editor/esm/vs/language/typescript/ts.worker")
      .end();
    return memo;
  },
});
