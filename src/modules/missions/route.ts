import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";
import {
  MissionsSchema,
  MissionSchema,
  MissionDetailSchema,
  SlugParamSchema,
  CreateMissionSchema,
  PatchMissionSchema,
  ErrorSchema,
} from "./schema";
import { db } from "../../lib/db";

export const missionsRoute = new OpenAPIHono();

// --- [GET] Ambil Semua ---
const getAll = createRoute({
  method: "get",
  path: "/",
  tags: ["Missions"],
  summary: "Get all missions",
  responses: {
    200: {
      description: "Sukses",
      content: { "application/json": { schema: MissionsSchema } },
    },
  },
});

missionsRoute.openapi(getAll, async (c) => {
  const data = await db.mission.findMany({ orderBy: { id: "asc" } });

  const parsedData = MissionsSchema.parse(data);
  const responseData: z.infer<typeof MissionsSchema> = parsedData;

  return c.json(responseData, 200);
});

// --- [GET] Detail by Slug ---
const getBySlug = createRoute({
  method: "get",
  path: "/{slug}",
  tags: ["Missions"],
  summary: "Get mission detail by slug",
  request: { params: SlugParamSchema },
  responses: {
    200: {
      description: "Data ditemukan",
      content: { "application/json": { schema: MissionDetailSchema } },
    },
    404: {
      description: "Not Found",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

missionsRoute.openapi(getBySlug, async (c) => {
  const { slug } = c.req.valid("param");
  const mission = await db.mission.findUnique({
    where: { slug: slug }, // Pencarian pakai slug
    include: { characters: true, locations: true },
  });

  if (!mission) return c.json({ message: "Mission not found" }, 404);

  const parsedMission = MissionDetailSchema.parse(mission);
  return c.json(parsedMission as z.infer<typeof MissionDetailSchema>, 200);
});

// --- [POST] Buat Baru ---
const create = createRoute({
  method: "post",
  path: "/",
  tags: ["Missions"],
  summary: "Create a new mission",
  request: {
    body: { content: { "application/json": { schema: CreateMissionSchema } } },
  },
  responses: {
    201: {
      description: "Created",
      content: { "application/json": { schema: MissionSchema } },
    },
  },
});

missionsRoute.openapi(create, async (c) => {
  const body = c.req.valid("json");
  const result = await db.mission.create({ data: body });

  const parsedResult = MissionSchema.parse(result);
  return c.json(parsedResult as z.infer<typeof MissionSchema>, 201);
});

// --- [PATCH] Update ---
const updatePartial = createRoute({
  method: "patch",
  path: "/{slug}",
  tags: ["Missions"],
  summary: "Partially update mission",
  request: {
    params: SlugParamSchema,
    body: { content: { "application/json": { schema: PatchMissionSchema } } },
  },
  responses: {
    200: {
      description: "Updated",
      content: { "application/json": { schema: MissionSchema } },
    },
    404: {
      description: "Not Found",
      content: { "application/json": { schema: ErrorSchema } },
    },
    500: {
      description: "Internal Server Error",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

missionsRoute.openapi(updatePartial, async (c) => {
  const { slug } = c.req.valid("param");
  const body = c.req.valid("json");

  try {
    const result = await db.mission.update({
      where: { slug: slug }, // Pencarian pakai slug
      data: body,
    });
    const parsedResult = MissionSchema.parse(result);
    return c.json(parsedResult as z.infer<typeof MissionSchema>, 200);
  } catch (error: any) {
    if (error.code === "P2025") {
      return c.json({ message: "Mission not found" }, 404);
    }
    return c.json({ message: "Internal Server Error" }, 500);
  }
});

// --- [DELETE] Hapus ---
const deleteMission = createRoute({
  method: "delete",
  path: "/{slug}",
  tags: ["Missions"],
  summary: "Delete mission by slug",
  request: { params: SlugParamSchema },
  responses: {
    200: {
      description: "Deleted",
      content: { "application/json": { schema: ErrorSchema } },
    },
    404: {
      description: "Not Found",
      content: { "application/json": { schema: ErrorSchema } },
    },
    500: {
      description: "Internal Server Error",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

missionsRoute.openapi(deleteMission, async (c) => {
  const { slug } = c.req.valid("param");

  try {
    await db.mission.delete({
      where: { slug: slug }, // Pencarian pakai slug
    });
    return c.json({ message: "Successfully deleted" }, 200);
  } catch (error: any) {
    if (error.code === "P2025") {
      return c.json({ message: "Mission not found" }, 404);
    }
    return c.json({ message: "Internal Server Error" }, 500);
  }
});
