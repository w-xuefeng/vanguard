FROM feuxw/bun-node:1.1

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN bun i
EXPOSE 7087

ARG DBC
ENV DBC=$DBC
ENTRYPOINT [ "pm2-runtime", "start", "bun", "--", "serve" ]
