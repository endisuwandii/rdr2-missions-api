
import { Pool } from "pg"; 
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../generated/prisma"; 


const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Tolong masukkan DATABASE_URL di environment variables!");
}


const pool = new Pool({ connectionString });


const adapter = new PrismaPg(pool);


const db = new PrismaClient({ adapter });

export { db };