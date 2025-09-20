import { Hono } from "hono";
import { missions } from "./data";
import { db } from "./lib/db";

const app = new Hono();

app.get("/", (c) => {
  return c.text(" Welcome Red Dead Redemtion 2!");
});

app.get("/missions", async (c) => {
  const missions = await db.mission.findMany();

  return c.json(missions);
});

app.get("/missions/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const mission = await db.mission.findUnique({
    where: { id },
  });

  return c.json(mission);
});

app.post("/missions", async (c) => {
  const body = await c.req.json();

  const newMision = await db.mission.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return c.json(newMision);
});

const server = Bun.serve({
  port: 3000,
  fetch: app.fetch,
});

console.log(`Listening on ${server.url}`);
