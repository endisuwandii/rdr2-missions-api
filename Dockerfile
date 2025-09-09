FROM oven/bun


WORKDIR /src/index


COPY package.json bun.lock ./


RUN bun install --frozen-lockfile


COPY . .


EXPOSE 4000


CMD ["bun", "run", "start"]