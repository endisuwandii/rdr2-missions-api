import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "bun prisma/seed.ts",
  },
  // KEMBALIKAN KE DATASOURCE: Di sinilah tempat URL yang benar
  datasource: {
    url: env("DATABASE_URL"),
  },
});
