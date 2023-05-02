FROM oven/bun

WORKDIR /usr/src/app

COPY dist/. /usr/src/app

RUN bun i

EXPOSE 7087

CMD [ "pm2", "start", "vanguard.sh"]
