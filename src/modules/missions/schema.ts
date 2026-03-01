import { z } from "@hono/zod-openapi";

// 1. SCHEMA DASAR
export const MissionSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  title: z.string().openapi({ 
    example: "old-friends",
    description: "Judul misi dalam format slug lowercase" 
  }),
  description: z.string().openapi({ 
    example: "Attack the O'Driscoll camp." 
  }),
  chapter: z.string().openapi({ 
    example: "Chapter 1" 
  }),
});

export const MissionsSchema = z.array(MissionSchema);

// 2. SCHEMA RELASI
const CharacterInMissionSchema = z.object({
  id: z.number(),
  name: z.string().openapi({ example: "Dutch van der Linde" }),
  role: z.string().openapi({ example: "Leader" }),
});

const LocationInMissionSchema = z.object({
  id: z.number(),
  name: z.string().openapi({ example: "Colter" }),
  chapter: z.string().openapi({ example: "Chapter 1" }),
});

export const MissionDetailSchema = MissionSchema.extend({
  characters: z.array(CharacterInMissionSchema),
  locations: z.array(LocationInMissionSchema),
});

// 3. SCHEMA REQUEST
export const SlugParamSchema = z.object({
  slug: z.string().openapi({ 
    param: { name: "slug", in: "path" },
    example: "old-friends" 
  }),
});

export const CreateMissionSchema = z.object({
  title: z.string().min(3).openapi({ 
    example: "enter-pursued-by-a-memory",
    description: "Wajib menggunakan format slug lowercase"
  }),
  description: z.string().min(10).openapi({ 
    example: "Find John Marston in the mountains during a blizzard." 
  }),
  chapter: z.string().openapi({ 
    example: "Chapter 1" 
  }),
});

export const PatchMissionSchema = CreateMissionSchema.partial();

export const ErrorSchema = z.object({
  message: z.string().openapi({ example: "Mission not found" }),
});