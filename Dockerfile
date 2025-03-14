# for amd64
FROM feuxw/bun-node:1.4

# for arm64
# FROM feuxw/bun-node:1.4-arm64

WORKDIR /usr/src/app
COPY . /usr/src/app

ARG BE_PORT
ENV BE_PORT=$BE_PORT

ARG DB_TYPE
ENV DB_TYPE=$DB_TYPE

ARG DBC
ENV DBC=$DBC

ARG LOG_PATH
ENV LOG_PATH=$LOG_PATH

RUN bun i
EXPOSE $BE_PORT

ENTRYPOINT [ "pm2-runtime", "start", "bun", "--", "serve" ]
