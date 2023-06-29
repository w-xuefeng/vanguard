FROM oven/bun

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_18.x  | bash -
RUN apt-get -y install nodejs
RUN echo "NODE Version:" && node --version
RUN echo "NPM Version:" && npm --version

RUN bun i
EXPOSE 7087

CMD ["bun", "serve"]
