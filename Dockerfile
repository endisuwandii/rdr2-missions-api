FROM oven/bun:debian

WORKDIR /src/index

COPY . .

RUN bun install 

CMD ["bun", "start"]