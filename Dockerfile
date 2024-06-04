FROM feuxw/bun-node:1.2

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN bun i
EXPOSE 7087

ARG DB_TYPE
ENV DB_TYPE=$DB_TYPE

ARG DBC
ENV DBC=$DBC
ENTRYPOINT [ "pm2-runtime", "start", "bun", "--", "serve" ]
