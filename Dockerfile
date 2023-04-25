FROM node:18

WORKDIR /usr/src/app

COPY dist/. .

RUN sh check-bun.sh

RUN bun i

EXPOSE 7087
CMD [ "pm2", "start", "vanguard.sh"]
