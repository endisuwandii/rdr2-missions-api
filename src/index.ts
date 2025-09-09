import { Hono } from "hono";
import { missions } from "./data";

const app = new Hono();

app.get("/", (c) => {
  return c.text(" Welcome Red Dead Redemtion 2!");
});

app.get("/missions", (c) => {
  return c.json(missions);
});

app.get("/missions/:id", (c) => {
  const id = Number(c.req.param("id"));
  const mission = missions.find((m) => m.id === id);
  if (mission) {
    return c.json(mission);
  } else {
    return c.json({ message: "Misi tidak ditemukan" }, 404);
  }
});

const server = Bun.serve({
  port: 4000,

  fetch: app.fetch,
});

console.log(`Listening on ${server.url}`);
