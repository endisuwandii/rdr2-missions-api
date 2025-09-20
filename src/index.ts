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
      chapter: body.chapter,
      description: body.description,
    },
  });

  return c.json(newMision);
});

app.delete("/missions/:id", async (c) => {
  const id = Number(c.req.param("id"));

  if (isNaN(id)) {
    return c.json({ error: "Invalid mission ID." }, 400);
  }

  try {
    const deletedMission = await db.mission.delete({
      where: { id: id },
    });
    return c.json(deletedMission);
  } catch (error) {
    // Menangani kasus jika misi dengan ID tersebut tidak ditemukan
    return c.json({ error: "Mission not found or could not be deleted." }, 404);
  }
});

const server = Bun.serve({
  port: 3000,
  fetch: app.fetch,
});

console.log(`Listening on ${server.url}`);
