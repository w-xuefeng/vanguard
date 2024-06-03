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
- More features and experience optimization continue to be improved...

## How to use

### Configure production environment variables

_Configure_ in `packages/backend/.env.production` as required

```dotenv
BE_PORT=7087
# Service run port

FE_PATH=app/web/views
# Front-end page path

DB_TYPE=redis
# Database type, support sqlite and redis

DBC=redis://127.0.0.1:6379
# sqlite file path or redis database connection address
# If DB_TYPE is redis, the format is redis[s]://[[username][:password]@][host][:port][/db-number]

LOG_PATH=runtime/logs
# Runtime Log Directory
```

### Using Docker

1. Clone this project

```shell
git clone https://github.com/w-xuefeng/vanguard.git
```

2. Enter the project directory and build the image

   _Note: redis is not included in the docker environment, you can use a remote redis connection or install it manually outside the container and configure it in the environment variables_

```shell
cd vanguard
docker build -t vanguard .
# docker build -t vanguard . --build-arg DBC=redis://127.0.0.1:6379
# docker build -t vanguard . --build-arg DBC=mydb.sqlite
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

   _Note: redis needs to be installed and configured in advance, either using a remote redis connection or installed locally and configured in the environment variable_

```shell
cd vanguard

npm run i
# The bun and project dependencies will be installed automatically. If the installation of the bun fails, you can install it manually using the following command:
# curl -fsSL https://bun.sh/install | bash

bun serve
```

Visit the service path `/_` to access the configuration screen

## Development Debugging

1. Environmental Preparation

Install bun

```shell
curl -fsSL https://bun.sh/install | bash
```

[Install redis](https://redis.io/docs/getting-started/installation/)，If there is a remote redis available, you can use the remote connection

```dotenv
DBC=redis[s]://[[username][:password]@][host][:port][/db-number]
```

2. Clone this project

```shell
git clone https://github.com/w-xuefeng/vanguard.git
```

3. Enter the project directory, install the dependencies, and start the service

   _The front-end project uses port 7086 by default, and the server uses port 7087 by default._

```shell
cd vanguard
bun run i
bun start
```

Visit the service path `http://localhost:7086/_` or `http://localhost:7087/_`
to access the configuration

4. Directory Structure

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
