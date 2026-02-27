import { z } from "@hono/zod-openapi";

export const MissionSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  description: z.string().openapi({ example: "Attack the O'Driscoll camp." }),
  title: z.string().openapi({ example: "Old Friends" }),
  chapter: z.string().openapi({ example: "Chapter 1" }),
});

export const MissionsSchema = z.array(MissionSchema);

// --- TAMBAHKAN INI UNTUK MENANGANI RELASI PRISMA ---

export const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.string(),
  missionId: z.number(),
});

export const LocationSchema = z.object({
  id: z.number(),
  name: z.string(),
  chapter: z.string(),
  missionId: z.number(),
});

// LOGIKA: Kita "extend" (perluas) MissionSchema asli 
// dengan menambahkan array karakter dan lokasi
export const MissionDetailSchema = MissionSchema.extend({
  characters: z.array(CharacterSchema),
  locations: z.array(LocationSchema),
});