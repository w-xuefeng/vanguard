<img src="packages/frontend/src/assets/logo.png" width="160px" />

简体中文 ｜ [English](README.md)

---

## 这是啥

- Vanguard 是一个由 [bun](https://bun.sh) 驱动的极简网关服务
- 配置界面使用 [react](https://react.dev/) + [umijs](https://umijs.org/) 构建
- 使用 [redis](https://redis.io/) 作为持久化存储方案

## 有何功能

- 支持多用户登录
- 支持服务配置化
- 支持运行时日志
- 支持自定义拦截器/校验器
- 支持访问 path 黑/白名单
- 支持来访 ip 黑/白名单
- 更多功能和体验优化持续完善中...

## 如何使用

### 配置生产环境变量

_根据需求在 `packages/backend/.env.production` 中配置_

```dotenv
BE_PORT=7087
# 服务运行端口

FE_PATH=app/web/views
# 前端页面路径

DBC=redis://127.0.0.1:6379
# redis 数据库连接地址
# 格式 redis[s]://[[username][:password]@][host][:port][/db-number]

LOG_PATH=runtime/logs
# 运行时日志目录
```

### 使用 docker

1. 克隆本项目

```shell
git clone https://github.com/w-xuefeng/vanguard.git
```

2. 进入项目目录，构建镜像

   _注：docker 环境内不包含 redis, 可使用远程 redis 连接或者在容器外手动安装并配置在环境变量中_

```shell
cd vanguard
docker build -t vanguard .
```

3. 运行镜像，docker 容器内部服务默认使用端口 7087，映射容器外端口 8080

```shell
docker run -id --name=vanguard -p 8080:7087 vanguard
```

### 不使用 docker

1. 克隆本项目

```shell
git clone https://github.com/w-xuefeng/vanguard.git
```

2. 进入项目目录，安装依赖，启动服务，服务默认使用端口 7087

   _注：需要提前安装并配置好 redis，可使用远程 redis 连接或者在本地安装并配置在环境变量中_

```shell
cd vanguard

npm run i
# 将自动安装 bun 及项目依赖，如果安装 bun 失败，可使用以下命令手动安装:
# curl -fsSL https://bun.sh/install | bash

bun serve
```

访问服务路径 `/_` 即可进入配置界面

## 开发调试

1. 环境准备

安装 bun

```shell
curl -fsSL https://bun.sh/install | bash
```

[安装 redis](https://redis.io/docs/getting-started/installation/)，如果有可用的远程 redis, 可以使用远程连接

```dotenv
DBC=redis[s]://[[username][:password]@][host][:port][/db-number]
```

2. 克隆本项目

```shell
git clone https://github.com/w-xuefeng/vanguard.git
```

3. 进入项目目录，安装依赖，启动服务

   前端项目默认使用端口 7086， 服务端默认使用端口 7087

```shell
cd vanguard
bun run i
bun start
```

访问服务路径 `http://localhost:7086/_` 或 `http://localhost:7087/_`
即可进入配置界面

4. 目录结构

```
🛡︎ vanguard
 └ 📦 packages
    ├ 📂 backend
    | └ 📂 app
    |   ├ 🛢️ database
    |   ├ 📜 guard
    |   ├ 🛠️ utils
    |   ├ 📑 web
    |   └ index.ts
    |
    ├ 📂 frontend
    | ├ 📜 .umirc.ts
    | └ 📂 src
    |   ├ 📜 assets
    |   ├ 📜 config
    |   ├ 📜 hooks
    |   ├ 📜 layout
    |   ├ 📜 pages
    |   ├ 📜 services
    |   ├ 📜 utils
    |   └ 📜 wrappers
    |
    └ 📂 shared
        ├ 📜 models
        └ 📜 types
```
