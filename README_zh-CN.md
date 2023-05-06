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

## 如何使用

### 使用 docker

1. 克隆本项目

```shell
git clone https://github.com/w-xuefeng/vanguard.git
```

2. 进入项目目录，构建镜像

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

```shell
cd vanguard

npm run i
# 将自动安装 bun 及项目依赖，如果安装 bun 失败，可使用以下命令手动安装:
# curl -fsSL https://bun.sh/install | bash

bun serve
```

访问服务路径 `/_` 即可进入配置界面
