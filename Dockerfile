FROM oven/bun

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN bun i

EXPOSE 7087

CMD ["bun", "serve"]
