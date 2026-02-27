import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi"; 
// Pastikan import MissionDetailSchema
import { MissionSchema, MissionsSchema, MissionDetailSchema } from "./schema"; 
import { db } from "../../lib/db";

export const missionsRoute = new OpenAPIHono(); 

// --- GET ALL MISSIONS (Sudah Benar) ---
// ... (Kode GET / biarkan seperti sebelumnya) ...

// --- GET BY SLUG (SUDAH DIPERBAIKI) ---
missionsRoute.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    tags: ["Missions"],
    summary: "Get mission by slug",
    request: {
      params: z.object({
        slug: z.string().openapi({ example: "Old Friends" }),
      }),
    },
    responses: {
      200: {
        description: "Detail misi ditemukan",
        content: {
          "application/json": { 
            // 1. GUNAKAN SKEMA DETAIL DI SINI
            schema: MissionDetailSchema 
          },
        },
      },
      // 2. TAMBAHKAN SKEMA UNTUK 404 AGAR BISA RETURN JSON
      404: { 
        description: "Mission not found",
        content: {
          "application/json": {
            schema: z.object({ message: z.string() })
          }
        }
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");

    const mission = await db.mission.findUnique({
      // Pastikan slug ini mencari ke kolom 'title' (karena di skema prisma kamu pakai title @unique)
      where: { title: slug }, 
      include: {
        characters: true,
        locations: true,
      },
    });

    if (!mission) {
      // Sekarang tidak perlu 'as any' karena janjinya sudah jelas di atas
      return c.json({ message: "Mission not found" }, 404);
    }

    // 3. RETURN DATA DENGAN AMAN
    return c.json(mission, 200);
  }
);