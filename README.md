<img src="packages/frontend/src/assets/logo.png" width="160px" />

[简体中文](README_zh-CN.md) ｜ English

---

## What‘s this

- Vanguard is a minimalist gateway service powered by [bun](https://bun.sh)
- The configuration interface is built using [react](https://react.dev/) + [umijs](https://umijs.org/)
- Use [redis](https://redis.io/) as a persistent storage solution

## What functions are there

- Support for multi-user login
- Support for service provisioning
- Support for Runtime Logging
- Support for custom interceptors/checkers
- Support access path black/white list
- Support visit ip black/white list

## How to use

### Using Docker

1. Clone this project

```shell
git clone https://github.com/w-xuefeng/vanguard.git
```

2. Go to the project directory and build the image

```shell
cd vanguard
docker build -t vanguard .
```

3. Run the image, docker container internal services use port 7087 by default, mapped outside the container port 8080

```shell
docker run -id --name=vanguard -p 8080:7087 vanguard
```

### Do not use Docker

1. Clone this project

```shell
git clone https://github.com/w-xuefeng/vanguard.git
```

2. Enter the project directory, install the dependencies and start the service, which uses port 7087 by default

```shell
cd vanguard

npm run i
# The bun and project dependencies will be installed automatically. If the installation of the bun fails, you can install it manually using the following command:
# curl -fsSL https://bun.sh/install | bash

bun serve
```

Visit the service path `/_` to access the configuration screen
